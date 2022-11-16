const express = require('express');
const router = express.Router();
const {
  sendNotification,
  getNotifications,
  getNotificationsByReceiverID,
  markNotificationAsReadByID,
  markAllNotificationAsRead,
} = require('../controllers/notificationControllers');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, sendNotification).get(protect, getNotifications);
router.route('/allNotifications').post(protect, markAllNotificationAsRead);
router.route('/:id').get(protect, getNotificationsByReceiverID).post(protect, markNotificationAsReadByID);

module.exports = router;
