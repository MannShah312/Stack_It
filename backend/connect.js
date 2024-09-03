import { connect } from 'mongoose';

const connectToDB = (uri)=> {
    return connect(uri);
} 
export default connectToDB;