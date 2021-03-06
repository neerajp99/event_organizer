import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Side from "../sidebar/Sidebar";
import {
  DashboardTop,
  DashboardBottom,
  DashboardContainer,
  DashboardBottomBox,
  BottomFlex,
  Icon,
  IconText,
  DashboardCount,
  DashboardText,
  DashboardAvatar,
  DashboardGreetings,
  DashboardButtons,
  DashboardButton
} from "./styles/Dashboard";
import { Container, InnerContainer } from "../../styles/Commons";
import icon1 from "../../utils/img/icon1.svg";
import icon2 from "../../utils/img/icon2.svg";
import icon3 from "../../utils/img/icon3.svg";
import { fetchTalks } from "../../actions/dashboardActions";
import Spin from "../../utils/Spinner";
import isEmpty from "../../validation/isEmpty";

class Dashboard extends Component {
  state = {
    dashboard: null,
    loading: true,
    talksSubmitted: 0,
    talksSelected: 0,
    attendees: 0,
    allTalks: null,
    dashboardLoading: true
  };

  componentDidMount() {
    this.props.fetchTalks();
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.dashboard.profile !== prevState.profile && nextProps.dashboard.talkDetails !== prevState.talkDetails) {
  //     if (nextProps.dashboard.profile !== null && nextProps.dashboard.talkDetails !== null) {
  //       return {
  //         dashboard: nextProps.dashboard,
  //         profile: nextProps.dashboard.profile,
  //         talkDetails: nextProps.dashboard.talkDetails.length ,
  //         loading: false
  //       };
  //     }
  //   }
  //   return null;
  // }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {allTalks} = nextProps.dashboard
    if (allTalks !== prevState.allTalks || typeof(allTalks) == "object"){
      if (!isEmpty(allTalks)) {
        const count = allTalks.length
        return {
          dashboard: nextProps.dashboard,
          allTalks: allTalks,
          talksSubmitted: count, 
          dashboardLoading: false 
        }
      } else {
        return {
          dashboardLoading: false,
          allTalks: 0,
          dashboard: {}
        }
      }
    }
  }

  render() {
    const {
      talksSelected,
      talksSubmitted,
      attendees,
      dashboard,
      talksCount,
      dashboardLoading
    } = this.state;
    return (
      <Container>
        <Side />
        <InnerContainer>
          {dashboard === null || dashboardLoading ? (
            <Spin />
          ) : (
            <DashboardContainer>
              <DashboardTop>
                <DashboardAvatar />
                <DashboardGreetings>
                  <span style={{ fontWeight: "600" }}>Welcome</span>{" "}
                  <span>Neeraj!</span>
                  <br />
                  <p style={{ fontSize: "1.3rem" }}>
                    Your Personalised Admin Dashboard.
                  </p>
                </DashboardGreetings>
                <DashboardButtons>
                  <DashboardButton>Event Website</DashboardButton>
                </DashboardButtons>
              </DashboardTop>

              <DashboardBottom>
                <DashboardBottomBox>
                  <Icon>
                    <img
                      style={{ height: "40px", width: "40px" }}
                      src={icon1}
                      alt=""
                    />
                  </Icon>
                  <IconText>
                    <span style={{ color: "#fff" }}>Complete</span> profile.
                    Your Profile section includes a form to add/update profile
                    with personal details, social links and avatar.
                  </IconText>
                </DashboardBottomBox>

                <DashboardBottomBox>
                  <Icon style={{ background: "#4ca1ff" }}>
                    <img
                      src={icon2}
                      style={{ height: "40px", width: "40px" }}
                      alt=""
                    />
                  </Icon>
                  <IconText>
                    <span style={{ color: "#fff" }}>Create</span> an eye-catchy
                    talk with all the information. You can submit a maximum of
                    three talks.
                  </IconText>
                </DashboardBottomBox>

                <DashboardBottomBox>
                  <Icon>
                    <img
                      src={icon3}
                      style={{ height: "40px", width: "40px" }}
                      alt=""
                    />
                  </Icon>
                  <IconText>
                    <span style={{ color: "#fff" }}>Sit back and relax!</span>{" "}
                    You will see the update on the talk if it's selected or not
                    on the dashboard itself.{" "}
                  </IconText>
                </DashboardBottomBox>

                <DashboardBottomBox>
                  <DashboardCount color={"orange"}>
                      {talksSubmitted}
                  </DashboardCount>
                  <DashboardText color={"orange"}>Talks Submitted</DashboardText>
                </DashboardBottomBox>

                <DashboardBottomBox>
                  <DashboardCount color="weird">
                    {attendees}
                  </DashboardCount>
                  <DashboardText color={"weird"}>Attendees</DashboardText>
                </DashboardBottomBox>
                <DashboardBottomBox>
                  <DashboardCount color="orange">{talksSelected}</DashboardCount>
                  <DashboardText color="orange">Talks Selected</DashboardText>
                </DashboardBottomBox>
              </DashboardBottom>
            </DashboardContainer>
          )}
        </InnerContainer>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  dashboard: state.dashboard
});

export default connect(
  mapStateToProps,
  { fetchTalks }
)(withRouter(Dashboard));
