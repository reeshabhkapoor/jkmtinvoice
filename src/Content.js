import React from "react";
import "./Content.css"
import SimpleTable from "./SimpleTable";
import CurrencyFormat from 'react-currency-format';

const Content = (props) => {
    let totalPrice = props.clientRecords.reduce((sum, record) => {
        let commission = (record.comm / 100) * record.roomRate;
        let totalPrice = commission * record.nights;
        return sum + totalPrice
    }, 0);
    let tds = (0.05 * totalPrice).toFixed(2);

    return (
        <div className="content">
            <div className="topData">
                <div className="leftdata">
                    <p>To</p>
                    <div className="hotelname">
                        <p>{props.data.hotelName}</p>
                        <p>{props.data.hotelAddress}</p>
                    </div>
                </div>
                <div className="rightData">
                    <br />
                    <div className="tabrow">
                        <p className="label">INVOICE NO </p>
                        <p> : {props.data.invoiceNo}</p>
                    </div>
                    <div className="tabrow">
                        <p className="label">DATE</p>
                        <p> : {props.data.date}</p>
                    </div>
                </div>
            </div>
            <SimpleTable clientRecords={props.clientRecords} />
            <div className="totalrow">
                <p>Total: &nbsp;</p>
                <p className="rightamount">INR   {<CurrencyFormat thousandSpacing="2s" value={totalPrice.toFixed(2)} displayType={'text'} thousandSeparator={true} suffix={'/-'} />}</p>
            </div>
            <div className="totalrow">
                <p>TDS @ 5% ON GROSS COMMISSION: &nbsp;</p>
                <p className="rightamount">INR   {<CurrencyFormat thousandSpacing="2s" value={tds} displayType={'text'} thousandSeparator={true} suffix={'/-'} />}</p>
            </div>
            <div className="totalrow">
                <p className="amountlabel">NETT PAYABLE AMOUNT &nbsp;</p>
                <p className="finalAmount">INR   {<CurrencyFormat value={(totalPrice - tds).toFixed(2)} thousandSpacing="2s" displayType={'text'} thousandSeparator={true} suffix={'/-'} />}</p>
            </div>

            <div className="closuredetails">
                <div className="closurerow">
                    <p>PAN NO.</p>
                    <p className="panrow">AAKJ0034F</p>
                </div>
                <div className="closurerow" style={{ fontSize: "12px" }}>
                    <p>NOTE:</p>
                    <p className="panrow">CHEQUE TO BE MADE IN THE NAME OF <u>JKM TRAVELS</u></p>
                </div>
            </div>
        </div>
    );
}

export default Content;