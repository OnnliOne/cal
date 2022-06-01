import { renderEmail } from "@calcom/emails";

import AttendeeScheduledEmail from "./attendee-scheduled-email";

export default class AttendeeLocationChangeEmail extends AttendeeScheduledEmail {
  protected getNodeMailerPayload(): Record<string, unknown> {
    return {
      icalEvent: {
        filename: "event.ics",
        content: this.getiCalEventAsString(),
      },
      to: `${this.attendee.name} <${this.attendee.email}>`,
      from: `${this.calEvent.organizer.name} <${this.getMailerOptions().from}>`,
      replyTo: this.calEvent.organizer.email,
      subject: `${this.t("location_changed_event_type_subject", {
        eventType: this.calEvent.type,
        name: this.calEvent.team?.name || this.calEvent.organizer.name,
        date: `${this.getInviteeStart("h:mma")} - ${this.getInviteeEnd("h:mma")}, ${this.t(
          this.getInviteeStart("dddd").toLowerCase()
        )}, ${this.t(this.getInviteeStart("MMMM").toLowerCase())} ${this.getInviteeStart(
          "D"
        )}, ${this.getInviteeStart("YYYY")}`,
      })}`,
      html: renderEmail("AttendeeLocationChangeEmail", {
        calEvent: this.calEvent,
        attendee: this.attendee,
        recurringEvent: this.recurringEvent,
      }),
      text: this.getTextBody("event_location_changed"),
    };
  }
}
