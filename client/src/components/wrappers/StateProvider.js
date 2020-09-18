import React, {Component} from 'react';
import {FILTER_ALL} from '../../services/filter';
import {MODE_CREATE, MODE_NONE} from '../../services/mode';
import {objectWithOnly, wrapChildrenWith} from '../../util/common';
import {getAll, addToList, updateStatus} from '../../services/todo';

class StateProvider extends Component {
    constructor() {
        super();
        this.state = {
            query: '',
            mode: MODE_CREATE,
            filter: FILTER_ALL,
            list: []
        }
    }

    render() {
        let children = wrapChildrenWith(this.props.children, {
            data: this.state,
            actions: objectWithOnly(this, ['addNew', 'changeFilter', 'changeStatus', 'changeMode', 'setSearchQuery'])
        });

        return <div>{children}</div>;
    }

    async addNew(text) {
        const todo = await addToList(text, this.state.list)
        this.setState({
            list: [
                ...this.state.list,
                todo
            ]
        })
    }

    changeFilter(filter) {
        this.setState({filter});
    }

    async changeStatus(todo, data) {
        await updateStatus(todo._id, data)
            .then((res => {
                this.setState({
                    list: this.state.list.map(item => {
                        return item.id === todo.id ?
                            {
                                id: todo.id,
                                _id: res._id,
                                completed: res.completed,
                                text: res.text
                            } : item
                    })
                })
            }))
        // const updatedList = updateStatus(this.state.list, itemId, completed);

        // this.setState({list: updatedList});
    }

    changeMode(mode = MODE_NONE) {
        this.setState({mode});
    }

    setSearchQuery(text) {
        this.setState({query: text || ''});
    }

    initilaize() {
        getAll().then(todos => {
            this.setState({
                list: todos || []
            })
        })

    }
    componentDidMount() {
        this.initilaize()
    }
    // initialize() {
    // }
}

export default StateProvider;
