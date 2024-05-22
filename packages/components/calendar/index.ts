import _calendar from './src/calendar.vue';
import { withInstall } from "@niko/utils/with-install";

const Calendar = withInstall(_calendar);

export default Calendar;

declare module 'vue' {
    export interface GlobalComponents {
        NkCalendar: typeof Calendar;
    }
}


export * from './src/calendar'