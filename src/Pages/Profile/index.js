import HeaderSection from "@aio/components/HeaderSection";
import Input from "@aio/components/Input";
import styles from "./Profile.module.css";
import Section from "@aio/components/Section";
import FullButton from "@aio/components/FullButton";
import InlineButton from "@aio/components/InlineButton";
import { useState } from "react";
import { useSelector } from "react-redux";
import { updatePassword, updateUser } from "src/actions";
import { useDispatch } from "react-redux";

const Profile = (props) => {
    const dispatch = useDispatch();

    const auth = useSelector(state => state.auth);

    const [name, setName] = useState(auth.user.name);
    const [email, setEmail] = useState(auth.user.email);

    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfrmPass] = useState("");

    const [passValidation, setPassValidation] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const user = {
          "id": auth.user.id,
          "name": name
      }
        dispatch(updateUser(user));
      };

      const handlePassSubmit = async (e) => {
        e.preventDefault();

        const password = {
            "id": auth.user.id,
            "oldPassword": oldPass,
            "newPassword": newPass
        }
        {
            oldPass ? 
            newPass === confirmPass ?
                dispatch(updatePassword(password)) :
                setPassValidation("Please reconfirm your new password")
                :
            setPassValidation("New password cannot be blank")
        }

      };

    return (
        <div className={styles.container}>
            <HeaderSection 
                heading={`Hello, ${name}`}
                subHeading={'This is your profile!'}
            />
            <section className={styles["login-container"]}>
                {/* profile form */}
                <div className={styles["form-container"]}>
                    <div className="t-center" style={{ margin: "15px 0" }}>
                    <div className={styles["sm-brand-container"]}>
                        
                    </div>
                        <h1>Profile</h1>
                        <p>Information</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <Input
                            inputContainerStyle={{ padding: "15px 30px" }}
                            type="text"
                            placeholder="Name"
                            onChange={(e) => setName(e.target.value)}
                            name="name"
                            label={"Your Name"}
                            value={name}
                        />
                        <Input
                            inputContainerStyle={{ padding: "15px 30px" }}
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            label={"Your Email  (Not Editable)"}
                            value={email}
                            disabled={true}
                        />
                    </form>
                    <div className={styles["button-container"]}>
                        <InlineButton onClick={handleSubmit} label={"Update"} />
                    </div>
                </div>
            </section>
            <section className={styles["login-container"]}>
                {/* profile form */}
                <div className={styles["form-container"]}>
                    <div className="t-center" style={{ margin: "15px 0" }}>
                    <div className={styles["sm-brand-container"]}>
                        
                    </div>
                    <h1>Change</h1>
                    <p>Password </p>
                    </div>
                    <form onSubmit={handlePassSubmit}>
                        <Input
                            inputContainerStyle={{ padding: "15px 30px" }}
                            type="text"
                            placeholder="Old Password"
                            onChange={(e) => setOldPass(e.target.value)}
                            name="name"
                            label={"Type Old Password"}
                            value={oldPass}
                        />
                        <Input
                            inputContainerStyle={{ padding: "15px 30px" }}
                            type="text"
                            placeholder="New Password"
                            onChange={(e) => setNewPass(e.target.value)}
                            name="password"
                            label={"Type New Password"}
                            value={newPass}
                        />
                        <Input
                            inputContainerStyle={{ padding: "15px 30px" }}
                            type="text"
                            placeholder="Confirm Password"
                            onChange={(e) => setConfrmPass(e.target.value)}
                            name="confirm password"
                            label={"Re-Type New Password"}
                            value={confirmPass}
                        />
                        <div className={styles["button-container"]}>
                            <p style={{color:"red"}}>{passValidation}</p>
                            <InlineButton onClick={handlePassSubmit} label={"Change"} />
                        </div>
                    </form>
                </div>
            </section>
      </div>
        
    );
}

export default Profile;