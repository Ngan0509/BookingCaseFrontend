import React from "react"
import * as actions from "../../../store/actions";
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}

class UserTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            arrUsers: []
        }
    }

    componentWillUnmount() {
        this.setState({
            arrUsers: []
        })
    }

    async componentDidMount() {
        this.props.fetchAllUserStart()
        // let resp = await userService.getAllUser("All")
        // toast.success(resp.errMessage)
    }

    componentDidUpdate(preProps) {
        if (preProps.allUsersRedux !== this.props.allUsersRedux) {
            this.setState({
                arrUsers: this.props.allUsersRedux
            })
        }
    }

    handleDeleteUser = (userId) => {
        this.props.deleteUser(userId)
    }

    handleEditUser = (user) => {
        this.props.handleEditUserfromParent(user)
    }
    render() {
        const { arrUsers } = this.state
        console.log(arrUsers, this.props.allUsersRedux)
        return (
            <>
                <div className='user-table mt-4'>
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                arrUsers && arrUsers.length > 0 &&
                                arrUsers.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.email}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.address}</td>
                                        <td>
                                            <button onClick={() => this.handleEditUser(user)} className='btn-edit'>
                                                <i className='bx bxs-pencil'></i>
                                            </button>
                                            <button onClick={() => this.handleDeleteUser(user.id)} className='btn-delete'>
                                                <i className='bx bxs-trash'></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                    <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
        allUsersRedux: state.admin.allUsers
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUserStart: () => dispatch(actions.fetchAllUserStart()),
        deleteUser: (userId) => dispatch(actions.deleteUser(userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);