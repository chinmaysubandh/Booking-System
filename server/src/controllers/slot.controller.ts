import { Request, Response } from "express";
import Slot, { ISlot } from "../models/Slot";


const formatSlot = (slot: ISlot) => ({
  id: slot._id,
  date: slot.date,
  startTime: slot.startTime,
  endTime: slot.endTime,
  capacity: slot.capacity,
  bookedCount: slot.bookedCount,
  remainingCapacity: slot.capacity - slot.bookedCount,
});


export const seedSlots = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const slotCount = await Slot.countDocuments();

    if (slotCount > 0) {
      res.status(400).json({
        success: false,
        message: "Slots have already been seeded.",
      });
      return;
    }

    const sampleSlots = [
      {
        date: new Date("2026-07-20"),
        startTime: "09:00",
        endTime: "09:30",
        capacity: 3,
      },
      {
        date: new Date("2026-07-20"),
        startTime: "10:00",
        endTime: "10:30",
        capacity: 2,
      },
      {
        date: new Date("2026-07-20"),
        startTime: "11:00",
        endTime: "11:30",
        capacity: 1,
      },
      {
        date: new Date("2026-07-20"),
        startTime: "12:00",
        endTime: "12:30",
        capacity: 5,
      },
    ];

    await Slot.insertMany(sampleSlots);

    res.status(201).json({
      success: true,
      message: "Sample slots created successfully.",
    });
  } catch (error) {
    console.error("Seed Slots Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const getSlots = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const slots = await Slot.find().sort({
      date: 1,
      startTime: 1,
    });

    const formattedSlots = slots.map(formatSlot);

    res.status(200).json({
      success: true,
      count: formattedSlots.length,
      slots: formattedSlots,
    });
  } catch (error) {
    console.error("Get Slots Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};