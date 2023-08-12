import HeaderSection from "@aio/components/HeaderSection";
import Input from "@aio/components/Input";
import styles from "./Profile.module.css";
import Section from "@aio/components/Section";
import FullButton from "@aio/components/FullButton";
import InlineButton from "@aio/components/InlineButton";

const Profile = (props) => {
    return (
        // <section className={styles["Container"]}>
        //     <HeaderSection 
        //         heading={'Hello Admin'}
        //         subHeading={'This is your profile!'}
        //     />
        //                     <p>Profile Information</p>
        //     <div className={styles["profileEdit-container"]}>
        //         <div className={styles["Edit-container"]}>
        //             <Input
        //                 inputContainerStyle={{ padding: "15px 30px" }}
        //                 type="text"
        //                 placeholder="Name"
        //                 onChange={(e) => console.log(e)}
        //                 name="name"
        //                 label={"Name"}
        //             />
        //             <Input
        //                 inputContainerStyle={{ padding: "15px 30px" }}
        //                 type="text"
        //                 placeholder="Email"
        //                 onChange={(e) => console.log(e)}
        //                 name="email"
        //                 label={"Email"}
        //             />
        //             <Input
        //                 inputContainerStyle={{ padding: "15px 30px" }}
        //                 type="password"
        //                 placeholder="Password"
        //                 onChange={(e) => console.log(e)}
        //                 name="email"
        //                 label={"Email"}
        //             />
        //       </div>
        //     </div>
        // </section>

        <div className={styles.container}>
            <HeaderSection 
                heading={'Hello Admin'}
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
                    <div>
                        <Input
                            inputContainerStyle={{ padding: "15px 30px" }}
                            type="text"
                            placeholder="Name"
                            onChange={(e) => console.log(e)}
                            name="name"
                            label={"Your Name"}
                        />
                        <Input
                            inputContainerStyle={{ padding: "15px 30px" }}
                            type="text"
                            placeholder="Email"
                            onChange={(e) => console.log(e)}
                            name="email"
                            label={"Your Email"}
                        />
                    </div>
                    <div className={styles["button-container"]}>
                        <InlineButton onClick={""} label={"Update"} />
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
                    <div>
                    <Input
                        inputContainerStyle={{ padding: "15px 30px" }}
                        type="text"
                        placeholder="Old Password"
                        onChange={(e) => console.log(e)}
                        name="name"
                        label={"Type Old Password"}
                    />
                    <Input
                        inputContainerStyle={{ padding: "15px 30px" }}
                        type="text"
                        placeholder="New Password"
                        onChange={(e) => console.log(e)}
                        name="password"
                        label={"Type New Password"}
                    />
                    <Input
                        inputContainerStyle={{ padding: "15px 30px" }}
                        type="text"
                        placeholder="Confirm Password"
                        onChange={(e) => console.log(e)}
                        name="confirm password"
                        label={"Re-Type New Password"}
                    />
                    <div className={styles["button-container"]}>
                        <InlineButton onClick={""} label={"Change"} />
                    </div>
                    </div>
                </div>
            </section>
      </div>
        
    );
}

export default Profile;