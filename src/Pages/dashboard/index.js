import { useEffect, useRef, useState } from "react";
import Card from "@aio/components/Card";
import Modal from "@aio/components/Modal";
import styles from "./Home.module.css";

import DoughnutChartExample from "../../components/DoughnutChartExample";
import HeaderSection from "@aio/components/HeaderSection";
import DataCard from "@aio/components/DataCard";
import { SlCalender } from "react-icons/sl";
import ActionButton from "@aio/components/ActionButton";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Section from "@aio/components/Section";

import BillingHistory from "../../components/ProjectHistory";
import Paragraph from "../../components/Paragraph";
import BarChartExample from "../../components/BarChartExample";
import Input from "@aio/components/Input";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const auth = useSelector(state => state.auth);
  const portfolios = useSelector(state => state.portfolio);
  const [modal, setModal] = useState(false);

  const totalPortfolios = portfolios.portfolios.length;

  const handleClose = () => {
    //alert('closing');
    setModal(false);
  };

  const handleCancel = () => {
    setModal(false);
  }

  const handleSubmit = () => {
    alert('Submit is working..!');
    handleClose();
  }
  const role = auth.user.role;
  const upperRole = role.toUpperCase();
  return (
    <>
      <HeaderSection
        heading={`${upperRole}'s, Dashboard`}
        subHeading={`Hello, ${auth.user.name}. Welcome to airlyStudio.`}
        // rightItem={() => (
        //   <ActionButton
        //     onClick={() => setModal(true)}
        //     Icon={AiOutlinePlusCircle}
        //     label="Add New Portfolio"
        //   />
        // )}
      />

      <Section>
        <DataCard
          label={"Total Visiter's"}
          value={"Need to develop"}
          percentageValue={0}
          inverse={true}
        />
        <DataCard
          label={"Total Portfolio's"}
          value={totalPortfolios}
          // percentageValue={3.45}
          inverse={false}
        />
      </Section>

      <Section>
        <div style={{
                display: "flex",
                gap: "10px"
              }}>
          <Card
            heading="Bar Chart Example"
            subHeading="Lets see how data is ploting on chartjs"
            topRight= "false"
            footerRight= "false"
          >
            <BarChartExample />
          </Card>
          <Card
            heading="Doughnut Chart Example"
            subHeading="Lets see how data is ploting on chartjs"
            topRight= "false"
            footerRight= "false"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <DoughnutChartExample />
            </div>
          </Card>
        </div>
      </Section>

      {/* <Section>
        <Card
          heading="Basic Plan"
          subHeading="Our most popular plan for small teams."
          rightItem={() => {
            return <h2>$20 per month</h2>;
          }}
          footerLeft={() => {
            return (
              <div className={styles["date-placeholder"]}>
                <SlCalender />
                <p className="ml-5">5th Sep 2023</p>
              </div>
            );
          }}
          footerRight={() => {
            return (
              <ActionButton
                inverse={true}
                label="View"
                style={{ padding: "2px 5px", fontSize: 12 }}
              />
            );
          }}
        >
          <div style={{ margin: "10px" }}>
            <Paragraph />
            <Paragraph />
          </div>
        </Card>

        <Card heading="Payment method" subHeading="Change how you pay for plan">
          <div style={{ margin: "10px" }}>
            <Paragraph />
          </div>
        </Card>

        <Card
          heading="Basic Plan"
          subHeading="Our most popular plan for small teams."
          rightItem={() => {
            return <h2>$20 per month</h2>;
          }}
        >
          <div style={{ margin: "10px" }}>
            <Paragraph />
          </div>
        </Card>
      </Section> */}

      {/* <BillingHistory /> */}

      <Modal
        isOpen={modal}
        onClose={handleClose}
        heading={"Create New Portfolio"}
        positiveText={"Save Changes"}
        // negativeText={"Cancel"}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
    >
                    <div>
      <Input
        inputContainerStyle={{ padding: "15px 30px" }}
        type="text"
        placeholder="Title"
        onChange={(e) => console.log(e)}
        name="title"
        label={"Title of the portfolio"}
      />
      <Input
        inputContainerStyle={{ padding: "15px 30px" }}
        type="password"
        placeholder="Description"
        onChange={(e) => console.log(e)}
        name="desc"
        label={"Description"}
      />

        {/* {portfolioTags.map((tag, index) => (
          <Input
          inputContainerStyle={{ }}
          type="checkbox"
          placeholder=""
          onChange={(e) => console.log(e)}
          name="tag"
          label={tag.text}
        />
        ))} */}
      </div>
    </Modal>
    </>
  );
}
