import * as React from 'react'
import { connect } from 'react-redux';
import SearchGroup from './SearchGroup';

export class Home extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <SearchGroup/>
            </div>    
        );
    }
}

export default connect()(Home);