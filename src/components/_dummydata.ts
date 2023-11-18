export const Exams = [
	{
		id:"testingexam1",
		label: "SuperMath III",
		schedule: new Date("2023-12-31T16:20:00Z"),
		questionId: [],
    creator:'Yue'
	},
	{
		id:"testingexam2",
		label: "ExaMath",
		schedule: new Date("2023-10-29T12:10:00Z"),
    creator:'Ahmed'
	},
	{
		id:"testingexam3",
		label: "Anatomy ",
		schedule: new Date("2023-10-21T23:00:00Z"),
    creator:'Yue'
	},
	{
		id:"testingexam4",
		label: "Coba Coba OnExam",
		schedule: new Date("2023-10-31T13:00:00Z"),
    creator:'Yue'
	},
	{
		id:"testingexam5",
		label: "Asdasasdas ",
		schedule: new Date("2023-11-01T21:30:00Z"),
    creator:'Yue'
	},
	{
		id:"testingexam6",
		label: "test",
		schedule: new Date("2023-11-11T15:00:00Z"),
    creator:'Emperor'
	},
];

const currentDateTime = new Date();


const PassedList = Exams.filter(
  (exam) => exam.schedule.getTime() <= currentDateTime.getTime()
).sort((a, b) => a.schedule.getTime() - b.schedule.getTime());

const UpcomingList = Exams.filter(
  (exam) => exam.schedule.getTime() > currentDateTime.getTime()
).sort((a, b) => a.schedule.getTime() - b.schedule.getTime());

export const upcomingLength = UpcomingList.length

export const passedLength = PassedList.length
