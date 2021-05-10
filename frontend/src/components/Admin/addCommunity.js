import React, {Component} from 'react';
import {withStyles} from "@material-ui/core/styles";
import AdminNavBar from "../AdminNavBar";

const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(1),
    },
});

class AddCommunityAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <AdminNavBar />
                <br />
                <br />
                <div className="container segment">
                    <div className="row" >
                        <div className="col-md-12">
                            <fieldset className="fieldsetStyle">
                                <legend>Add Community</legend>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(useStyles)(AddCommunityAdmin);