import React, { useEffect, useState } from 'react';
import Info from './Info';
import Header from './Header';
import Footer from './Footer';
import FilteredList from './FilteredList';
import {applyFilter, search} from '../../services/filter';

export default function TodoList(props) {
    const [count, setCount] = useState(0)
    const [items, setItems] = useState([])

    const { filter, mode, query } = props.data;
    const { addNew, changeFilter, changeStatus, changeMode, setSearchQuery, initialize } = props.actions;


    useEffect(() => {
        if (props.data.list.length) {
            setItems(search(applyFilter(props.data.list, filter), query))
            setCount(props.data.list.length)
        }
    }, [props.data])

    return (
        <div className="co  ntainer">
            <div className="row">
                <div className="todolist">
                    <Header {...{addNew, mode, query, setSearchQuery}}/>
                    <FilteredList {...{items, changeStatus}}/>
                    <Footer {...{count, filter, changeFilter, mode, changeMode}}/>
                    <Info {...{mode}}/>
                </div>
            </div>
        </div>
    );
}
