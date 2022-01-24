import React, { useContext, useState } from "react";
import { Typography, Box, Tabs, Tab } from "@mui/material";
import { bronzePlan } from "../Plans/bronze";
import { sliverPlan } from "../Plans/sliver";
import { goldPlan } from "../Plans/gold";
import { platinumPlan } from "../Plans/platinum";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { store } from "../../firebase";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";

const Investment = () => {
  toast.configure();

  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const addInvestment = async (amount, plan) => {
    try {
      // get the user deposit
      const docRef = doc(store, "/users", `${user.email}`);
      const userDetails = await getDoc(docRef);
      const balanceAmount = userDetails.data().balance;
      const depositedAmount = userDetails.data().deposited;
      const totalPackages = userDetails.data().totalPackages;
      if ((amount > balanceAmount) | (amount > depositedAmount)) {
        toast.error("insufficent Fund", {
          theme: "colored",
          position: "bottom-center",
        });
        navigate("/deposit");
      } else {
        await updateDoc(docRef, {
          balance: depositedAmount - amount,
          totalPackages: totalPackages + 1,
          activePages: plan,
        });

        toast.info("Request Submitted", {
          theme: "colored",
          position: "top-center",
        });

        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const TabPanel = ({ children, value, index }) => {
    return <Box>{value === index && <Box sx={{ p: 3 }}>{children}</Box>}</Box>;
  };

  return (
    <>
      <Box>
        <Typography variant="h6" component="div">
          Choose a plan to Invest In...
        </Typography>
      </Box>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
        >
          <Tab
            label="Bronze"
            sx={{ color: "#fff", textTransform: "uppercase" }}
          />
          <Tab
            label="Sliver"
            sx={{ color: "#fff", textTransform: "uppercase" }}
          />
          <Tab
            label="Gold"
            sx={{ color: "#fff", textTransform: "uppercase" }}
          />
          <Tab
            label="Premium"
            sx={{ color: "#fff", textTransform: "uppercase" }}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div>
          <div className="row">
            {bronzePlan.map((plan) => (
              <div className="col-sm-12 col-md-3 col-lg-3 " key={plan.id}>
                <div className="plan__card p-5 mb-3 shadow">
                  <div>
                    <h1 className="fw-bolder fs-1">{`$${plan.invest}`}</h1>
                  </div>
                  <div className="plan-reward">
                    <p>Reward:{`$${plan.reward}`}</p>
                    <p>Duration:{plan.duration}</p>
                  </div>
                  <div className="my-4">
                    <button
                      className="btn btn-success "
                      onClick={() => addInvestment(plan.invest, "Bronze")}
                    >
                      Start Now !!{" "}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div>
          <div className="row">
            {sliverPlan.map((plan) => (
              <div className="col-sm-12 col-md-3 col-lg-3 " key={plan.id}>
                <div className="plan__card p-5 shadow">
                  <div>
                    <h1 className="fw-bolder fs-1">{`$${plan.invest}`}</h1>
                  </div>
                  <div className="plan-reward">
                    <p>Reward:{`$${plan.reward}`}</p>
                    <p>Duration:{plan.duration}</p>
                  </div>
                  <div className="my-4">
                    <button
                      className="btn btn-success text-sec"
                      onClick={() => addInvestment(plan.invest, "Sliver")}
                    >
                      Start Now !!{" "}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div>
          <div className="row">
            {goldPlan.map((plan) => (
              <div className="col-sm-12 col-md-4 col-lg-4 mt-3 " key={plan.id}>
                <div className="plan__card p-5 shadow">
                  <div>
                    <h1 className="fw-bolder fs-1">{`$${plan.invest}`}</h1>
                  </div>
                  <div className="plan-reward">
                    <p>Reward:{`$${plan.reward}`}</p>
                    <p>Duration:{plan.duration}</p>
                  </div>
                  <div className="my-4">
                    <button
                      className="btn btn-success text-sec"
                      onClick={() => addInvestment(plan.invest, "Gold")}
                    >
                      Start Now !!{" "}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <div>
          <div className="row">
            {platinumPlan.map((plan) => (
              <div className="col-sm-12 col-md-4 col-lg-4 mt-3 " key={plan.id}>
                <div className="plan__card p-5 shadow">
                  <div>
                    <h1 className="fw-bolder fs-1">{`$${plan.invest}`}</h1>
                  </div>
                  <div className="plan-reward">
                    <p>Reward:{`$${plan.reward}`}</p>
                    <p>Duration:{plan.duration}</p>
                  </div>
                  <div className="my-4">
                    <button
                      className="btn btn-success text-sec"
                      onClick={() => addInvestment(plan.invest, "Platinum")}
                    >
                      Start Now !!{" "}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </TabPanel>
    </>
  );
};

export default Investment;
