import React from 'react';
import * as axios from 'axios';
import AllUsers from './AllUsers';

class Users extends React.Component {

	//ajax запрос выполняется только после того, как компонент отрисуется и вмонтируется в html
	componentDidMount() {
		axios
			.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${this.props.currentPage}`)
			.then(response => {
				this.props.setUsers(response.data.items);
				this.props.setTotalUsersCount(response.data.totalCount)
			})
	}

	onPageChanged = (pageNumber) => {
		this.props.setCurrentPage(pageNumber);
		axios
			.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${pageNumber}`)
			.then(response => {
				this.props.setUsers(response.data.items)
			})
	};

	render() {
		return <AllUsers
			totalUsersCount={this.props.totalUsersCount}
			pageSize={this.props.pageSize}
			currentPage={this.props.currentPage}
			onPageChanged={this.onPageChanged}
			follow={this.props.follow}
			unfollow={this.props.unfollow}
			users={this.props.users}/>
	}
}

export default Users;
