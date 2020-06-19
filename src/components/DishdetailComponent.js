import React, { Component } from 'react';
import {Card, CardImg, CardText, CardTitle, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Row} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors} from 'react-redux-form';
import {Loading } from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
 
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmit(values){
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }
    render(){
        return(
            <React.Fragment>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody className="m-2 font-weight-normal">
                    <LocalForm onSubmit={(values)=> this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="rating">Rating</Label>
                            <Control.select model=".rating" id="rating" name="rating"
                            className="form-control" defaultValue="1" >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Control.select>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="author"> Your Name</Label>
                            <Control.text model=".author" id="author" name="author" placeholder="Your Name"
                            className="form-control"
                            validators={{
                                required, minLength: minLength(3), maxLength: maxLength(15)
                            }}
                            ></Control.text>
                            <Errors
                            className="text-danger"
                            model=".author"
                            show="touched"
                            messages=
                            {{required:"Required ",
                            minLength: "Must be greater than 2 characters",
                            maxLength: "Must be 15 characters or less"
                            }}
                            />
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="comment"> Comment</Label>
                            <Control.textarea model=".comment" id="comment" name="comment" rows="6" cols="90"></Control.textarea> 
                        </Row>
                        <Row className="form-group">
                            <Button color="primary" type="submit" value="submit"> Submit</Button>
                        </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>

                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>
            </React.Fragment> 
        );
    }
}

function RenderComments({comments, postComment, dishId}){
        if(comments!=null){
            return(
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                        <ul className="list-unstyled">
                        <Stagger in>
                        {comments.map((comment)=>{
                            return(
                                <Fade in>
                                  <li key={comment.id}>
                                    <p>{comment.comment}</p>
                                   <p>-- {comment.author},&nbsp;{new Intl.DateTimeFormat('en-US',{year:'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                  </li>
                                </Fade>
                            );
                        })}
                        </Stagger>
                    </ul>
                    <CommentForm dishId={dishId} postComment={postComment} />
                </div>
            );
        }
        else{
            return(
                <div></div>
            );
        }
    }

  function RenderDish({dish}){
        return(
            <div className="col-12 col-md-5 m-1">
            <FadeTransform
            in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
                <Card>
                    <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name}></CardImg>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
            </div>
        );
    }

    const Dishdetail = (props)=>{
        if (props.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading/>
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if(props.dish!=null){
            return(
                <div className="container">
                    <div className="row">
                       <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr/>
                        </div>
                    </div>
                 <div className="row">
                    <RenderDish dish={props.dish}/>
                    <RenderComments comments={props.comments}
                    postComment={props.postComment} dishId={props.dish.id} />
                </div>
                </div>
            );
        }
        else{
            return(
                <div></div>
            );
        }
    }

export default Dishdetail;