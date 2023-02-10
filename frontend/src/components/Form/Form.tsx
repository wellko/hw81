import {Box, Link, TextField} from "@mui/material";
import {useState} from "react";

import {LoadingButton} from "@mui/lab";
import {FormState, PostingState} from "../../types";
import axiosApi from "../../axios-api";
import {apiUrl} from "../../constants";

const Form = () => {
	const initialState: PostingState = {
		shortUrl: '',
		postingNow: false,
	}
	const [post, setPost] = useState<FormState>({
		url: '',
	});
	const [posting, setPosting] = useState<PostingState>(initialState)

	const postMessage = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await setPosting(prev => ({...prev, postingNow: true}));
			const response = await axiosApi.post('/links', post);
			if (response) {
				await setPosting(prev => ({...prev, shortUrl: response.data.shortUrl}));
				await setPost(prev => ({...prev, url: ''}))
			}
		} finally {
			await setPosting(prev => ({...prev, postingNow: false}))
		}
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target;
		setPost(prev => ({...prev, [name]: value}));
	};

	return (
		<Box border={2} borderRadius={2} borderColor='#000' sx={{bgcolor: '#FFF'}} marginBottom={3}>
			<form onSubmit={postMessage}>
				<TextField name='url' required fullWidth label="Enter URL here " id="fullWidth" onChange={onChange}
						   value={post.url}
						   margin='normal'/>
				<LoadingButton loading={posting.postingNow} type='submit' variant='contained'>Shorten!</LoadingButton>
			</form>
			{posting.shortUrl ? <>
					<p><b>your link now looks like this</b></p>
					<Link href={apiUrl + posting.shortUrl}>{apiUrl}{posting.shortUrl}</Link> </>
				: null}
		</Box>
	);
};

export default Form;