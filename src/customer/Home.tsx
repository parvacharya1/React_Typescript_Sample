import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import { Edit,Delete } from '../images';

interface IState {
    customers: customer[];
}

interface customer {
    id: number;
    first_name: String;
    last_name: String;
    email: String;
    phone: String;
    address: String;
    description: String;
}

const columns =  ["First Name","Last Name","Email","Phone","Address","Description","Actions"];

export default class Home extends React.Component<RouteComponentProps, IState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = { customers: [] }
    }
    public componentDidMount(): void {
        axios.get(`http://localhost:5000/customers`).then(response => {
            this.setState({ customers: response.data })
        })
    }
    public deleteCustomer(id: number) {
        axios.delete(`http://localhost:5000/customers/${id}`).then(data => {
            const index:number = this.state.customers.findIndex(customer => customer.id === id);
            this.state.customers.splice(index, 1);
            this.props.history.push('/');
        })
    }

    
public render() {
        const customers = this.state.customers;
        return (
            <div>
                <h1> Customer Management System </h1>
                <div className="container"><br/>
                <button className="btn btn-success" onClick={()=>{
                           this.props.history.push('/create')
                       }}>+ Add Customer</button>
                    <div className="row">
                        <table className="table table-bordered">
                            <thead className="thead-light">
                                <tr>
                                 {columns.map(item=><th key={`${item} col`} scope="col">{item}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {customers && customers.map(customer =>
                                    <tr key={customer.id}>
                                        <td>{customer.first_name}</td>
                                        <td>{customer.last_name}</td>
                                        <td>{customer.email}</td>
                                        <td>{customer.phone}</td>
                                        <td>{customer.address}</td>
                                        <td>{customer.description}</td>
                                        <td>
                                            <div className="d-flex justify-content-between align-items-center">
                                             <Link to={`edit/${customer.id}`} className="btn btn-sm btn-outline-secondary"><img height={20} width={20} src={Edit} alt="Edit" /> </Link>
                                             <button className="btn btn-sm btn-outline-secondary" onClick={() => this.deleteCustomer(customer.id)}><img height={20} width={20} src={Delete} alt="Delete" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    {customers.length === 0 &&
                    <div  style={{marginTop:50,marginRight:0,width:'100%'}}>
                        {customers.length === 0 && (
                            <div className="text-center" style={{marginBottom:40}}>
                                <h2 style={{opacity:0.6}}>No Records Found ...</h2>
                            </div>
                        )}
                      
                       </div>
                    }
                </div>
            </div>
        )
    }
}