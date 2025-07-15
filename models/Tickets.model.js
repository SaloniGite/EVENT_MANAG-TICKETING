const mongoose = require('mongoose');

// Schema for Ticket Types associated with Events
const ticketSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Associated event is required'],
      index: true 
    },

    type: {
      type: String,
      enum: ['VIP', 'General', 'Premium', 'Student'],
      required: [true, 'Ticket type is required'],
      trim: true
    },

    price: {
      type: Number,
      required: [true, 'Ticket price is required'],
      min: [0, 'Price must be a positive number']
    },

    quantity: {
      type: Number,
      required: [true, 'Ticket quantity is required'],
      min: [1, 'At least one ticket must be available']
    },

    sold: {
      type: Number,
      default: 0,
      min: [0, 'Sold tickets cannot be negative'],
      validate: {
        validator: function (value) {
          // sold tickets must never exceed total quantity
          return value <= this.quantity;
        },
        message: 'Sold tickets cannot exceed total quantity'
      }
    },

    isActive: {
      type: Boolean,
      default: true // for soft deletes or deactivation
    }

  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual field to calculate remaining tickets
ticketSchema.virtual('remaining').get(function () {
  return this.quantity - this.sold;
});

ticketSchema.index({ event: 1, type: 1 }, { unique: true });

module.exports = mongoose.model('Ticket', ticketSchema);
