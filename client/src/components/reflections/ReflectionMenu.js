import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CommentDialog from "./CommentDialog";

const ITEM_HEIGHT = 48;

export default function LongMenu(props) {
    const {
        user,
        deletePost,
        submitComment,
        id,
        setShowComments,
        showComments,
    } = props;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [addCommentOpen, setAddCommentOpen] = React.useState(false);

    const options = [
        "Add Comment",
        showComments ? "Hide Comments" : "Show Comments",
        "Delete",
    ];

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (option) => {
        setAnchorEl(null);

        //Decide action based on what is clicked
        if (option === "Delete") {
            deletePost(id);
        } else if (option === "Show Comments") {
            setShowComments(true);
        } else if (option === "Hide Comments") {
            setShowComments(false);
        } else if (option === "Add Comment") {
            setAddCommentOpen(true);
        }
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
                style={{ backgroundColor: "transparent" }}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: "20ch",
                    },
                }}
            >
                {options.map((option) => {
                    if (
                        option === "delete" &&
                        !user.accessLevel === "administrator"
                    ) {
                        return;
                    }

                    return (
                        <MenuItem
                            key={option}
                            onClick={() => {
                                handleClose(option);
                            }}
                            style={option === "Delete" ? { color: "red" } : {}}
                        >
                            {option}
                        </MenuItem>
                    );
                })}
            </Menu>
            {addCommentOpen && (
                <CommentDialog
                    addCommentOpen={addCommentOpen}
                    setAddCommentOpen={setAddCommentOpen}
                    submitComment={submitComment}
                    reflectionID={id}
                />
            )}
        </div>
    );
}