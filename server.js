const express = require('express');
const Timetable = require('comcigan-parser');
const cors = require('cors');

const app = express();
const timetable = new Timetable();
app.use(cors());

app.get('/timetable', async (req, res) => {
    const { classNum } = req.query;
    try {
        await timetable.init();
        const schoolList = await timetable.search('구로고'); 
        timetable.setSchool(schoolList[0].code);
        const result = await timetable.getTimetable();
        res.json(result[1][classNum || 1]);
    } catch (error) {
        res.status(500).json({ error: "에러" });
    }
});

app.listen(3000, () => console.log("서버/포트 3000"));