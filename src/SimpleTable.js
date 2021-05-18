import React from 'react';
import "./Content.css";
import CurrencyFormat from 'react-currency-format';

const SimpleTable = (props) => {
    return <table className="client_records">
        <tr>
            <th>Confm No.</th>
            <th>No of <br /> Nights</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Guest's Name</th>
            <th>Room Rate</th>
            <th>% Comm</th>
            <th>Net Payable <br /> per night</th>
            <th>Net Payable (INR)</th>
        </tr>
        {props.clientRecords?.map(record => {
            let commission = (record.comm / 100) * record.roomRate;
            return (
                <tr key={record.confmNo}>
                    <td>{record.confmNo}</td>
                    <td>{record.nights}</td>
                    <td>{record.checkin}</td>
                    <td>{record.checkout}</td>
                    <td>{record.name}</td>
                    <td align="right">{<CurrencyFormat thousandSpacing="2s" value={record.roomRate} displayType={'text'} thousandSeparator={true} suffix={'/-'} />}</td>
                    <td align="right">{record.comm}%</td>
                    <td align="right"><CurrencyFormat thousandSpacing="2s" value={commission.toFixed(2)} displayType={'text'} thousandSeparator={true} suffix={'/-'} /></td>
                    <td align="right"><CurrencyFormat thousandSpacing="2s" value={(commission * record.nights).toFixed(2)} displayType={'text'} thousandSeparator={true} suffix={'/-'} /></td>
                </tr>
            )
        })}
    </table>
}

export default SimpleTable;