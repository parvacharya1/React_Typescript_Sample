import * as React from 'react';
import axios from 'axios';
import { RouteComponentProps, withRouter } from 'react-router-dom';

export interface Values {
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    address: string,
    description: string,
}
export interface FormStage {
    [key: string]: any;
    values: Values[];
    submitSuccess: boolean;
    loading: boolean;
}

const fields= [
    {
        name: "first_name",
        type:"text",
        label:"First Name",
        placeholder: "Enter customer's first name"
    },
    {
        name: "last_name",
        type:"text",
        label:"Last Name",
        placeholder: "Enter customer's last name"
    },
    {
        name: "email",
        type:"email",
        label:"Email",
        placeholder:"Enter customer's email address"
    },
    {
        name: "phone",
        type:"text",
        label:"Phone",
        placeholder: "Enter customer's phone number"
    },
    {
        name: "address",
        type:"text",
        label:"Address",
        placeholder: "Enter customer's address"
    },
    {
        name: "description",
        type:"text",
        label:"Description",
        placeholder: "Enter Description"
    },
]

class Create extends React.Component<RouteComponentProps, FormStage> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            address: '',
            description: '',
            values: [],
            loading: false,
            submitSuccess: false,
        }
    }

    private processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        this.setState({ loading: true });
        const formData = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            phone: this.state.phone,
            address: this.state.address,
            description: this.state.description,
        }
        this.setState({ submitSuccess: true, values: [...this.state.values, formData], loading: false });
        axios.post(`http://localhost:5000/customers`, formData).then(data => [
            setTimeout(() => {
                this.props.history.push('/');
            }, 500)
        ]);
    }

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value,
    })
}

 render() {
    const { submitSuccess, loading } = this.state;
    
    return (
        <div>
            <div className={"col-md-12 form-wrapper"}>
                <h2> New Customer </h2>
                {!submitSuccess && (
                    <div className="alert alert-info" role="alert">
                        Fill the form below to create a new customer
                </div>
                )}
                {submitSuccess && (
                    <div className="alert alert-info" role="alert">
                        Customer successfully added!
                        </div>
                )}
                <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                  {fields.map((item)=>{
                        return(
                        <div key={`${item.name} ${item.type}`} className="form-group col-md-12">
                            <label htmlFor={item.name}> {item.label}</label>
                            <input type={item.type} id={item.name} onChange={(e) => this.handleInputChanges(e)} name={item.name} className="form-control" placeholder={item.placeholder} />
                        </div>
                        )
                    })}

                    <div className="form-group col-md-4">
                        <button className="btn btn-success" type="submit">
                            + Create Customer
                        </button>
                        {loading &&
                            <span className="fa fa-circle-o-notch fa-spin" />
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

}
export default withRouter(Create)