import React, { Component } from "react";
import { connect } from "react-redux";
import './todo.css' 
import {deleteTodo,toggleTodo,setVisibilityFilter} from "../actions/actionCreator";
import { ALL, COMPLETED, INCOMPLETED } from "../actions/actionsTypes";
import { bindActionCreators } from "redux";

class Table extends Component {
  render() {
    return (
      <div className="col-lg-10 offset-lg-1 col-md-10 col-sm-12 col-xs-12">
        <nav style={{ marginTop: "60px" }}>
          <ol className="breadcrumb">
            <li
              className={"breadcrumb-item "+ (this.props.visibilityFilter === ALL ? 'active' : '') }
              onClick={() => this.props.setVisibilityFilter(ALL)}>
             All
            </li>
            <li
               className={"breadcrumb-item "+ (this.props.visibilityFilter === COMPLETED ? 'active' : '') }
              onClick={() => this.props.setVisibilityFilter(COMPLETED)}>
              InCompleted
            </li>
            <li
               className={"breadcrumb-item "+ (this.props.visibilityFilter === INCOMPLETED  ? 'active' : '') }
              onClick={() => this.props.setVisibilityFilter(INCOMPLETED )}>
              Completed
            </li>
          </ol>
        </nav>
        {this.props.todos.length !== 0 ? (
          <table
            style={{ marginTop: "60px" }}
            className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Todo list</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.props.todos.map(todo => (
                <tr key={todo.id}>
                  <td
                    style={{textDecoration: todo.completed ? "line-through" : "none"}}>
                    {todo.text} {todo.completed === true ? "(completed)" : ""}
                  </td>
                  <td>
                    <span
                      className="fa fa-trash" onClick={() => this.props.deleteTodo(todo.id)}
                      style={{color: "#707070",fontSize: "18pt",marginRight: "20px"}}/>
                    <span
                      className="fa fa-check-square"onClick={() => this.props.toggleTodo(todo.id)}
                      style={{ color: "#707070", fontSize: "20pt" }}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div
            style={{ marginTop: "50px" }}
            className="col-lg-10 col-md-10 col-xs-12 col-sm-12 offset-lg-1">
          </div>
        )}{" "}
      </div>
    );
  }
}

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case ALL:
      return todos;
    case COMPLETED:
      return todos.filter(t => t.completed);
    case INCOMPLETED :
      return todos.filter(t => !t.completed);
    default:
      // throw new Error("Unknown filter: " + filter);
  }
};

const mapStateToProps = state => {
  return { todos: getVisibleTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
 };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      deleteTodo,
      toggleTodo,
      setVisibilityFilter
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);