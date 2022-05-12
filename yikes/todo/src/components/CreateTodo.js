import React, {Component} from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions/actionCreator'
import {bindActionCreators} from 'redux'
import './todo.css';

class CreateTodo extends Component {
    constructor(props){
        super(props)
        this.state = { todotext: '',}
        this.onChangeTodoText = this.onChangeTodoText.bind(this)
    }
    onChangeTodoText(e){
        this.setState({
            todotext: e.target.value
        })
    }
    render(){
        return (
            <div className="container form-inline">
            <div className="col-sm-10 form-box">
              <input onChange={this.onChangeTodoText} value={this.state.todotext} type="text" className="form-control" id="inputEmail3" placeholder="Add Todo list"/>
​              <button type="button" onClick={() => { this.props.addTodo(this.state.todotext); this.setState({ todotext: '' }) }} style={{ marginTop: "25px", marginLeft: "20px"}} className="btn btn-primary" id="add-Todo">Add Todo</button>
            </div>
          </div>

        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({addTodo}, dispatch)
}
export default connect(null, mapDispatchToProps)(CreateTodo)