import { Event } from '../../../types/firebase';
import EditEndDate from './endDate';
import EditImageURL from './image';
import EditIsPublic from './isPublic';
import EditIsStampRallyEnabled from './isStampRallyEnabled';
import EditLink from './link';
import EditMapImage from './mapImage';
import EditName from './name';
import EditOverview from './overview';
import EditStartDate from './startDate';

type EditInfoProps = {
    event: Event;
};

export default function EditInfo(props: EditInfoProps) {
    const { event } = props;

    return (
        <div className='flex flex-col gap-4 bg-content1 shadow-small px-6 py-4 rounded-large mt-16'>
            <EditName event={event} />
            <EditOverview event={event} />
            <EditIsPublic event={event} />
            <EditLink event={event} />
            <EditImageURL event={event} />
            <EditMapImage event={event} />
            <EditStartDate event={event} />
            <EditEndDate event={event} />
            <EditIsStampRallyEnabled event={event} />
        </div>
    );
}
