import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import ComponentToPrint from "./ComponentToPrint";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import "./FormDesign.css";
import Button from '@material-ui/core/Button';
import SimpleTable from "./SimpleTable";
import "react-datepicker/dist/react-datepicker.css";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function FormDesign() {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const classes = useStyles();

    let [clientRecord, changeClientRecord] = useState({
        confmNo: "",
        nights: "",
        checkin: "",
        checkout: "",
        name: "",
        roomRate: "",
        comm: ""
    })

    let [clientRecords, changeClientRecords] = useState([]);

    const [data, changeData] = useState({
        invoiceNo: "",
        hotelName: "",
        hotelAddress: "",
        date: ""
    });

    const [provideData, changeProvideData] = useState({});
    const [finalClientRecords, changeFinalClientRecords] = useState([]);

    const [showBill, changeShowBill] = useState(false);

    const submitData = event => {
        event.preventDefault();

        if (data.invoiceNo === "" || data.hotelName === "" || data.hotelAddress === "" || data.date === "") {
            alert("Please fill the required fields.");
        } else {
            changeShowBill(true);
            changeProvideData(data);
            changeFinalClientRecords(clientRecords);

            changeClientRecords([]);
            changeData({
                invoiceNo: "",
                hotelName: "",
                hotelAddress: "",
                date: ""
            });
        }
    }

    const addClientData = event => {
        event.preventDefault();

        if (clientRecord.confmNo === "" ||
            clientRecord.nights === "" ||
            clientRecord.checkin === "" ||
            clientRecord.checkout === "" ||
            clientRecord.name === "" ||
            clientRecord.roomRate === "" ||
            clientRecord.comm === "") {
            alert("Please fill all the client details.")
        }
        else {
            changeClientRecords((prevData) => [...prevData, clientRecord]);
            changeClientRecord({
                confmNo: "",
                nights: "",
                checkin: "",
                checkout: "",
                name: "",
                roomRate: "",
                comm: ""
            });
        }
    }

    const updateClient = event => {
        const { name, value } = event.target;
        changeClientRecord((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    const inputData = (event) => {
        const { name, value } = event.target;
        changeData((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    const getComponent = () => {
        if (showBill) {
            return <><ComponentToPrint data={provideData} clientRecords={finalClientRecords} ref={componentRef} />
                <div className="addClientButton">
                    <Button onClick={handlePrint} type="submit" variant="contained" color="primary">
                        Print/Save
                    </Button>
                    <Button
                        onClick={() => {
                            window.location.reload();
                        }}
                        style={{ marginLeft: "14px" }}
                        variant="contained"
                        color="secondary">
                        Refresh
                </Button></div></>;
        } else {
            return null;
        }
    }

    return (
        <>
            <div className="Company">JKM Travels Invoice Generator</div>
            <form onSubmit={addClientData} className={classes.root} noValidate autoComplete="off">
                <div className="designForm">
                    <div className="centerDetailsLabel">Client details:</div>
                    <div className="designClientData">
                        <div>
                            <TextField type="text"
                                label="Confirmation Number"
                                error={clientRecord.confmNo === "" ? true : false}
                                required
                                id="standard-required"
                                placeholder="Confirmation Number"
                                onChange={updateClient}
                                name="confmNo"
                                value={clientRecord.confmNo} />
                            <br />
                            <TextField type="text"
                                label="Client Name"
                                error={clientRecord.name === "" ? true : false}
                                required
                                id="standard-required"
                                placeholder="Client Name"
                                onChange={updateClient}
                                name="name"
                                value={clientRecord.name} />
                            <br />
                            <TextField type="text"
                                label="No. of nights"
                                error={clientRecord.nights === "" ? true : false}
                                required
                                id="standard-required"
                                placeholder="Number of nights"
                                onChange={updateClient}
                                name="nights"
                                value={clientRecord.nights} />
                            <br />
                            <TextField
                                label="Room Rate"
                                error={clientRecord.roomRate === "" ? true : false}
                                required
                                id="standard-required"
                                type="text"
                                placeholder="Room rate"
                                onChange={updateClient}
                                name="roomRate"
                                value={clientRecord.roomRate} />
                            <br />
                            <TextField
                                label="Check-in date"
                                error={clientRecord.checkin === "" ? true : false}
                                required
                                id="standard-required"
                                type="text"
                                placeholder="Check0In date"
                                onChange={updateClient}
                                name="checkin"
                                value={clientRecord.checkin} />
                            <br />
                            <TextField
                                label="Check-out date"
                                error={clientRecord.checkin === "" ? true : false}
                                required
                                id="standard-required"
                                type="text"
                                placeholder="Check-out date"
                                onChange={updateClient}
                                name="checkout"
                                value={clientRecord.checkout} />
                            <br />
                            <TextField
                                label="Commission in percent"
                                error={clientRecord.comm === "" ? true : false}
                                required
                                id="standard-required"
                                type="text"
                                placeholder="Commission in percentage"
                                onChange={updateClient}
                                name="comm"
                                value={clientRecord.comm} />
                            <br />

                            <div className="addClientButton">
                                <Button type="submit" variant="contained" color="secondary">
                                    Add client
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <div>-----------------------------------------------------------</div>

            <div className="clientRecords">
                <p>Client Records added:</p>
                <SimpleTable className="tableClient" clientRecords={clientRecords} />
            </div>

            <div>-----------------------------------------------------------</div>

            <form onSubmit={submitData} className={classes.root} noValidate autoComplete="off">
                <div className="designForm">
                    <div className="centerDetailsLabel">Basic Details:</div>
                    <TextField
                        label="Hotel Name"
                        error={data.hotelName === "" ? true : false}
                        required
                        id="standard-required"
                        type="text"
                        placeholder="Hotel Name"
                        onChange={inputData}
                        name="hotelName"
                        value={data.hotelName} />
                    <br />
                    <TextField
                        required
                        label="Hotel Address"
                        error={data.hotelAddress === "" ? true : false}
                        type="text"
                        placeholder="Hotel Address"
                        onChange={inputData}
                        name="hotelAddress"
                        value={data.hotelAddress} />
                    <br />
                    <TextField
                        label="Invoice Number"
                        required
                        error={data.invoiceNo === "" ? true : false}
                        type="text"
                        placeholder="Invoice Number"
                        onChange={inputData}
                        name="invoiceNo"
                        value={data.invoiceNo} />
                    <br />
                    <TextField
                        label="Date"
                        required
                        error={data.date === "" ? true : false}
                        type="text"
                        placeholder="Date"
                        onChange={inputData}
                        name="date"
                        value={data.date} />
                    <br />
                </div>
                <div className="addClientButton">
                    <Button className="addClientButton" type="submit" variant="contained" color="primary">
                        Submit
                </Button>
                    <Button
                        onClick={() => {
                            window.location.reload();
                        }}
                        style={{ marginLeft: "14px" }}
                        variant="contained"
                        color="secondary">
                        Refresh
                </Button>
                </div>

            </form>
            {getComponent()}
        </>


    );
}

