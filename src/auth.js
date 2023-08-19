const symbols = '0123456789'.split('');
const genRandomCode = () => {
    const res = [];
    for (let i=0; i<6; i++) {
        const copySymbols = [...symbols];
        const index = Math.floor(Math.random()*copySymbols.length)
        res.push(copySymbols.at(index));
    }
    return res.join('');
};
const notifyMe = (code) => {
    const notification = new Notification(`Ur code: ${code}`, {
        tag: 'ache-mail'
    });
};
const setNotif = async () => {
    const permissionResult = await Notification.requestPermission();
    if (permissionResult === "granted") {
        const generatedCode = genRandomCode();
        notifyMe(generatedCode);
        const response = await sendCodeToServer(generatedCode);
        console.log(response);
        const responseToDb = await sendToDb(generatedCode);
        console.log(responseToDb);
        console.log(generatedCode);
    } else {
        alert('Notifications are blocked!');
    }
};
const sendCodeToServer = async (code) => {
    const response = await fetch('/auth/authconfirm', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ code })
    });
    return response.text();
};
const sendToDb = async (code) => {
    const response = await fetch('/authh', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ code })
    });
    return response.json();
};
window.onload = async () => {
    await setNotif()
};