const asyncHandler = require('express-async-handler');

const Notification = require('../models/notificationModel');

// @desc Send Notification
// @route POST /api/notification
// @access Private
const sendNotification = asyncHandler(async (req, res) => {
  const { message, type, from, to } = req.body;

  /*
  Type:
    newClub
    newProposal
    newEven
    proposalRejected
  **/

  if (!message || !type || !from || !to) {
    res.status(400);
    throw new Error('Please enter all the required details');
  }

  //send notification (create)
  const notification = await Notification.create({
    message,
    type,
    from,
    to,
    read: false,
  });

  if (notification) {
    res.status(201).json({
      id: notification.id,
      message: notification.message,
      type: notification.type,
      from: notification.from,
      to: notification.to,
      read: notification.read,
    });
  } else {
    res.status(400);
    throw new Error('Invalid notification');
  }
});

// @desc Get Notifications
// @route GET /api/notifications
// @access Private
const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({});
  res.status(200).json(notifications);
});

// @desc Get Notifications by receiver ID
// @route GET /api/notifications/:id
// @access Private
const getNotificationsByReceiverID = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400);
    throw new Error('Please enter all the required details');
  }

  const notifications = await Notification.find({ to: id });

  res.status(200).json(notifications);
});

// @desc Mark a notification as read by ID
// @route POST /api/notifications/:id
// @access Private
const markNotificationAsReadByID = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400);
    throw new Error('Please enter all the required details');
  }

  let notification = await Notification.findOne({ _id: id });
  notification.read = true;

  notification.save();

  res.status(200).json(notification);
});

// @desc Mark all notification as read
// @route POST /api/notifications/allNotifications
// @access Private
const markAllNotificationAsRead = asyncHandler(async (req, res) => {
  const notifications = await Notification.updateMany({}, { read: true });

  res.status(200).json(notifications);
});

module.exports = {
  sendNotification,
  getNotifications,
  getNotificationsByReceiverID,
  markNotificationAsReadByID,
  markAllNotificationAsRead,
};
