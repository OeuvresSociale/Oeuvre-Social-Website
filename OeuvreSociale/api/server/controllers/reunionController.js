const reunion = require("../models/reunion");
const notification = require("../controllers/notification");
const Employee = require("../models/user");
const path = require("path");
const fs = require("fs");   
/**
  "title": "meet4",
  "desc": "testing ...",
  "date": "2022-06-05",
  "HeurDebut": "10:00",
  "HeurFin": "11:00"
}  
 */
const getMember = async () => {
  try {
    const rolesToFind = ["membre", "president", "tresorerie"]; // Array of roles to filter by

    const employees = await Employee.find({
      role: { $in: rolesToFind }, // Use $in operator for multiple roles
    }).select("email"); // Select only the "email" field

    return employees.map((employee) => employee.email); // Extract emails into an array
  } catch (error) {
    console.error(error); // Log the error for debugging
    throw new Error("Error retrieving members");
  }
};

const addMeet = async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ error: "Title is required" });
    }

    // Create new meeting and save it to the database
    const newMeet = new reunion(req.body);
    const savedMeet = await newMeet.save();

    // Retrieve members' emails
    const members = await getMember(); // Returns array of emails

    console.log("members:", members);
    const date = new Date(savedMeet.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    // Construct the email body dynamically using savedMeet data
    const emailBody = {
      to: members.join(", "),
      subject: savedMeet.title,
      message: `vous avez une reunion le ${date} du ${savedMeet.HeurDebut} a ${savedMeet.HeurFin} pour ${savedMeet.desc}`,
    };

    // Send email notification
    let emailSent = false;
    if (members && members.length > 0) {
      emailSent = await notification.sendEmail(
        {
          body: emailBody,
        },
        {}
      );
    } else {
      console.error("No members found for email notification.");
    }

    if (emailSent) {
      console.log(
        "New meeting added and email notification sent successfully!"
      );
      res.status(200).json(savedMeet);
    } else {
      console.error(
        "Error sending email notification. Meeting created successfully."
      );
      res.status(200).json(savedMeet); // Return the created meeting even if email fails
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//delete offre
const deleteMeet = async (req, res) => {
  // Verify if this meeting exists
  const existingMeet = await reunion.findById(req.params.id);
  if (!existingMeet) {
    return res.status(401).json("This meeting does not exist");
  }
  try {
    await reunion.findByIdAndDelete(req.params.id);
    res.status(200).json("Meeting has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get all offres
const getMeets = async (req, res) => {
  try {
    const meet = await reunion.find();
    res.status(200).json(meet);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//get one meet
const getMeet = async (req, res) => {
  try {
    const meet = await reunion.findById(req.params.id);
    res.status(200).json(meet);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//update
const updateMeet = async (req, res) => {
  try {
    const updateMeet = await reunion.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateMeet);
    console.log("meet has been updated");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//ajouter pdf
const addPV = async (req, res) => {
  try {
    const { id } = req.params;
    const pdfDoc = req.files;

    if (!pdfDoc) {
      return res.status(400).json({ error: "No PDF document uploaded" });
    }

    const updatedMeeting = await reunion.findByIdAndUpdate(
      id,
      {
        $set: {
          files: req.files.map((file) => ({
            fileName: file.filename, // Use the filename as fileId
            fileOriginalName: file.originalname,
          })),
        },
        historique: true,
      },
      { new: true }
    );

    if (!updatedMeeting) {
      return res.status(404).json({ error: "Meeting not found" });
    }

    res.status(200).json(updatedMeeting);
    console.log("PV has been added");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// meeting by year for historique page
const groupedMeet = async (req, res) => {
  try {
    // Query all meetings
    const meetings = await reunion.find();

    // Group meetings by year
    const meetingsByYear = {};
    meetings.forEach((meeting) => {
      const year = new Date(meeting.date).getFullYear().toString();
      if (!meetingsByYear[year]) {
        meetingsByYear[year] = [];
      }
      meetingsByYear[year].push(meeting);
    });

    res.json(meetingsByYear);
  } catch (error) {
    console.error("Error fetching meetings grouped by year:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getMeetYear = async (req, res) => {
  try {
    // Extract the year from the request params
    const year = req.params.year;

    // Query meetings for the specified year
    const meetings = await reunion.find({
      date: {
        $gte: new Date(`${year}-01-01`), // Start of the year
        $lt: new Date(`${parseInt(year) + 1}-01-01`), // Start of the next year
      },
    });

    res.json(meetings);
  } catch (error) {
    console.error("Error fetching meetings for the specified year:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
//function to display the files
const uploadsDir = path.join(__dirname, "../uploads");
async function getFileById(req, res) {
  const reunionId = req.params.reunionId;
  const fileId = req.params.fileId;
  console.log(fileId);
  try {
    // Retrieve the request document from the database
    const Reunion = await reunion.findById(reunionId);
    if (!Reunion) {
      return res.status(404).send("Reunion not found");
    }

    // Access files directly from the Reunion object
    const foundFile = Reunion.files.find(
      (file) => file._id.toString() === fileId
    );
    if (!foundFile) {
      return res.status(404).send("File not found");
    }
    const filePath = path.join(uploadsDir, foundFile.fileName);
    res.sendFile(filePath);
  } catch (error) {
    console.error("Error retrieving file:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  getFileById,
  updateMeet,
  addMeet,
  getMeets,
  getMeet,
  deleteMeet,
  addPV,
  groupedMeet,
  getMeetYear,
  getMember,
};
