import React from "react";
import "./ComponentToPrint.css"
import Content from "./Content";

class ComponentToPrint extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
            showBill: false,
            clientRecords: props.clientRecords
        };
    }

    render() {
        return (
            <div className="system">
                <div className="Company">JKM Travels</div>
                <div className="header_bottom" />

                <div className="mainContent">
                    <h4 className="commission">TRAVEL AGENT COMMISSION INVOICE</h4>
                    <Content data={this.state.data} clientRecords={this.state.clientRecords} />
                </div>
                <footer className="footer">
                    <p>75, Sukh Vihar, Delhi 110 051 #9999134484</p>
                    <p>Email : resvn@jkmtravel.co.in</p>
                </footer>
            </div>
            // <table>
            //   <thead>
            //     <th>column 1</th>
            //     <th>column 2</th>
            //     <th>column 3</th>
            //   </thead>
            //   <tbody>
            //     <tr>
            //       <td>data 1</td>
            //       <td>data 2</td>
            //       <td>data 3</td>
            //     </tr>
            //   </tbody>
            // </table>
        );
    }
}

export default ComponentToPrint;