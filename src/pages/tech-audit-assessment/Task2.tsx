import React, { Component } from 'react';

interface Props {
    count: number;
    initialName?: string;
}

interface State {
    name: string;
    clicks: number;
}

class TaskTwo extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            name: props.initialName || "Anonymous",
            clicks: 0,
        };
    }

    componentDidMount() {
        console.log("Setting up observers");
        console.log(`Count has changed to: ${this.props.count}`);
        console.log(`Clicks have been updated: ${this.state.clicks}`);
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        if (prevProps.count !== this.props.count) {
            console.log(`Count has changed to: ${this.props.count}`);
        }
        if (prevState.clicks !== this.state.clicks) {
            console.log(`Clicks have been updated: ${this.state.clicks}`);
        }
    }

    componentWillUnmount() {
        console.log("Clear observers");
    }

    handleClick = () => {
        this.setState((prevState) => ({ clicks: prevState.clicks + 1 }));
    };

    render() {
        const { name, clicks } = this.state;
        const { count } = this.props;

        return (
            <div>
                <h2>Task Two: Class Component Counter</h2>
                <div>Name: {name}</div>
                <div>Count: {count}</div>
                <div>Clicks: {clicks}</div>
                <button onClick={this.handleClick}>Increment Clicks</button>
            </div>
        );
    }
}

export default TaskTwo;
