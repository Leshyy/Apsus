import { eventBusService } from '../../../services/eventBusService.js';

export class EmailStatus extends React.Component {
    state = {
        unReadCount: null,
    };

    componentDidMount() {
        this.loadUnRead();
        eventBusService.on('readEmail', () =>
            this.setState({ unReadCount: this.state.unReadCount - 1 })
        );
    }

    loadUnRead = () => {
        console.log(this.props.emails);
    };
    render() {
        return (
            <section>Number Of Unread Emails:{this.state.unReadCount}</section>
        );
    }
}
