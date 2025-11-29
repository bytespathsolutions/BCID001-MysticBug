import { Message } from "../models/Message.js"
export const incomingMessagetoDoctorViaPatient = async (req, res) => {
  try {
    const { doctorId } = req.params;
    // Find all unique patients who have sent messages to this doctor
    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [
            { senderId: doctorId, receiverRole: 'patient' },
            { receiverId: doctorId, senderRole: 'patient' }
          ]
        }
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ['$senderId', doctorId] },
              '$receiverId',
              '$senderId'
            ]
          },
          patientName: {
            $first: {
              $cond: [
                { $eq: ['$senderId', doctorId] },
                '$receiverName',
                '$senderName'
              ]
            }
          }
        }
      }
    ]);
    const patients = conversations.map(item => ({
      patientId: item._id,
      patientName: item.patientName
    }));

    res.status(200).json(patients);
  } catch (error) {
    console.error('Error fetching doctor patients:', error);
    res.status(500).json({ error: 'Failed to fetch patients' });
  }
}
export const conversationBetweenUsers = async (req, res) => {
  try {
    const { userId1, userId2 } = req.params;
    const messages = await Message.find({
      $or: [
        { senderId: userId1, receiverId: userId2 },
        { senderId: userId2, receiverId: userId1 }
      ]
    }).sort({ timestamp: 1 });

    res.status(200).json({ messages });
  } catch (error) {
    console.error("Error fetching conversation:", error);
    return res.status(500).json({ error: 'Server error fetching messages' });
  }
}
export const deleteConversationBetweenUsers = async (req, res) => {
  try {
    const { userId1, userId2 } = req.params;

    await Message.deleteMany({
      $or: [
        { senderId: userId1, receiverId: userId2 },
        { senderId: userId2, receiverId: userId1 }
      ]
    });

    res.status(200).json({ message: 'Conversation deleted' });
  } catch (error) {
    console.error('Error deleting conversation:', error);
    res.status(500).json({ error: 'Failed to delete conversation' });
  }
}

export const sendMessage = async (req, res) => {
  try {
    const {
      senderId,
      senderName,
      senderRole,
      receiverId,
      receiverName,
      receiverRole,
      message
    } = req.body;
    // Validation
    if (!senderId || !receiverId || !message || !senderRole || !receiverRole) {
      return res.status(400).json({
        error: 'Missing required fields'
      });
    }

    const newMessage = new Message({
      senderId,
      senderName,
      senderRole,
      receiverId,
      receiverName,
      receiverRole,
      message,
      timestamp: new Date()
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({ error: 'Server error sending message' });
  }
}
export const markMessagesAsRead = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;

    await Message.updateMany(
      {
        senderId: senderId,
        receiverId: receiverId,
        read: false
      },
      {
        $set: { read: true }
      }
    );

    res.status(200).json({ message: 'Messages marked as read' });
  } catch (error) {
    console.error('Error marking messages as read:', error);
    res.status(500).json({ error: 'Failed to mark messages as read' });
  }
}
export const getLastMessageBetweenUsers = async (req, res) => {
  try {
    const { userId, otherUserId } = req.params;

    const lastMessage = await Message.findOne({
      $or: [
        { senderId: userId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: userId }
      ]
    }).sort({ timestamp: -1 });

    res.status(200).json(lastMessage || null);
  } catch (error) {
    console.error('Error fetching last message:', error);
    res.status(500).json({ error: 'Failed to fetch last message' });
  }
}

export const getAllMessagesBetweenDoctors = async (req, res) => {
  try {
    const { doctorId1, doctorId2 } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: doctorId1, receiverId: doctorId2 },
        { senderId: doctorId2, receiverId: doctorId1 }
      ]
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    console.error('Error fetching doctor messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
}

export const getLastMessageBetweenDoctors = async (req, res) => {
  try {
    const { doctorId1, doctorId2 } = req.params;

    const lastMessage = await Message.findOne({
      $or: [
        { senderId: doctorId1, receiverId: doctorId2 },
        { senderId: doctorId2, receiverId: doctorId1 }
      ]
    }).sort({ createdAt: -1 });

    res.json(lastMessage || {});
  } catch (error) {
    console.error('Error fetching last message:', error);
    res.status(500).json({ error: 'Failed to fetch last message' });
  }
}

export const sendMessageFromDoctorToDoctor = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;
    if (!senderId || !receiverId || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
      createdAt: new Date()
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
}