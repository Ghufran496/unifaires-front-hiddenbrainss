/* eslint-disable no-unused-vars */
export enum statusProps {
  accepted = "Accepted",
  rejected = "Rejected",
  unaccepted = "Unacceptable",
  unassigned = "Unassigned",
  //   interview =  interviewProps ,
}

export enum interviewProps {
  phoneInterview = "Phone Interview",
  firstpersoninterview = "1st Person Interview",
  secondpersoninterview = "2nd Person Interview",
}

export interface statusBadgeProps {
  accepted?: string;
  rejected?: string;
  unaccepted?: string;
  unassigned?: string;
  interview?: interviewBadgeProps;
}

export interface interviewBadgeProps {
  phoneInterview?: string;
  firstpersoninterview?: string;
  secondpersoninterview?: string;
}
