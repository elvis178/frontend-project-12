import {
  Container, Row, Col, Spinner,
} from 'react-bootstrap';
import { useEffect } from 'react';
import { useGetChannelsQuery } from '../api/apiChannels.js';
import Channels from '../components/Channels.jsx';
import MessageBox from '../components/MessageBox.jsx';

const MainPage = () => {
  const { isLoading: isChannelsLoading, error: channelsError } = useGetChannelsQuery();

  useEffect(() => {
    if (channelsError) {
      console.error(channelsError);
    }
  }, [channelsError]);

  if (isChannelsLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col sx={4} className="col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <Channels />
        </Col>
        <Col className="p-0 h-100">
          <MessageBox />
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;
