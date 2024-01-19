require('dotenv').config();
const readXlsxFile = require('read-excel-file/node');
const sections = require('./models/section');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true });
const school_rollover = {
    TS: 'TAS',
    SG: 'TAS',
    MG: 'SSHS',
    SS: 'SSHS',
    CA: 'CA',
    HG: 'HGS',
    SB: 'ASB',
    BG: 'ASB',
    Z: 'Z'
}

const rollover = function (course) {

    const _course = {
        crn: course.CRN,
        subject: course.SUBJ,
        number: course.CRSE,
        section: ("00" + course.SECT.toString()).slice(-2),
        title: course.CRSE_TITLE,
        subtitle: course.TITLE,
        school: school_rollover[course.COLL] || "X",
        term: "202240",
        credits: course.CHRS,
        session: course.SESS,
        days: {
            MON: course.MON === "M",
            TUE: course.TUE === "T",
            WED: course.WED === "W",
            THU: course.THU === "R",
            FRI: course.FRI === "F",
            SAT: course.SAT === "S",
            SUN: course.SUN === "U"
        },
        start: course.BEG,
        end: course.END,
        delivery: course.SCHD == "ONL" ? "online" : "inperson",
    };

    _course.searchable = `${_course.subject} ${_course.number} - ${_course.title}`;
    if (_course.subtitle && _course.subtitle.trim().length > 0) _course.searchable += ` - ${_course.subtitle}`;

    // Default ppterm to 1
    if (!_course.ptterm) {
        _course.ptterm = "1";
    }

    _course.instructor = {
        name: {
            last: course.LNAME,
            first: course.FNAME
        },
        email: course.EMAIL
    };
    return _course;
}
const read = async () => {
    const data = await readXlsxFile('data/202420.xlsx');
    const headers = data[0];
    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        const course = {
        };
        for (let c = 0; c < headers.length; c++) {
            course[headers[c]] = row[c];
        }

        const skips = ["100", "200", "300", "400", "500", "600", "700", "800", "900", "388", "000"]
        const honors = ["301", "302", "401", "402"]
        const roll = (c) => {
            if (skips.indexOf(c.CRSE.toString()) >= 0) return false;
            if (c.SUBJ == "SRSH" && honors.indexOf(c.CRSE.toString()) >= 0) return false;
            return true;

        }
        console.log(JSON.stringify(course, null, 2));
        //process.exit();
        if (roll(course)) {
            const section = rollover(course);
            await sections.create(section);
            console.log(`Success:   ${section.crn} ${section.subject} ${section.number} ${section.section} - ${section.title}`);
        }

    }
}

read();