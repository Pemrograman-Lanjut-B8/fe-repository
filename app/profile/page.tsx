"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Button, Card, Modal, Form, Alert, Spinner } from "react-bootstrap";
import UserService from "../services/user.service";
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editableProfile, setEditableProfile] = useState<any>(null);
  const [editLoading, setEditLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    UserService.getProfile().then(
      response => {
        setProfile(response.data);
        setLoading(false);
      },
      error => {
        if (error.response && error.response.status === 403) {
          router.push(`/login`);
        } else {
          const _profile =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
          setProfile(_profile);
          setLoading(false);
        }
      }
    );
  }, []);

  const handleEdit = () => {
    setEditableProfile({ ...profile, oldPassword: "", newPassword: "" });
    setShowEditModal(true);
  };

  const handleSave = async () => {
    setEditLoading(true);
    setMessage("");

    try {
      await UserService.updateProfile(editableProfile);
      setProfile(editableProfile);
      setShowEditModal(false);
    } catch (error: any) {
      const resMessage =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      setMessage(resMessage);
    }
    setEditLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditableProfile({ ...editableProfile, [name]: value });
  };

  const formatRoles = (roles: Set<string>) => {
    return Array.from(roles)
      .map(role => role.slice(5).toLowerCase())
      .map(role => role.charAt(0).toUpperCase() + role.slice(1))
      .join(", ");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#DCF2F1' }}>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Card className="p-4" style={{ width: '500px', backgroundColor: '#7FC7D9', borderColor: '#365486' }}>
          <div className="d-flex justify-content-center mb-4">
            <Card.Img 
              variant="top" 
              src={profile.profilePicture || "//ssl.gstatic.com/accounts/ui/avatar_2x.png"} 
              style={{ maxWidth: "200px", maxHeight: "200px" }} 
              className="mb-4" 
            />
          </div>
          <Card.Body>
            <Card.Title style={{ color: "#0F1035" }}>{profile.username}</Card.Title>
            <Card.Text style={{ color: "#0F1035" }}>
              <strong>Full Name:</strong> {profile.fullName}<br />
              <strong>Email:</strong> {profile.email}<br />
              <strong>Phone Number:</strong> {profile.phoneNumber}<br />
              <strong>Bio:</strong> {profile.bio}<br />
              <strong>Gender:</strong> {profile.gender}<br />
              {profile.birthDate && (
                <><strong>Birth Date:</strong> {new Date(profile.birthDate).toLocaleDateString()}<br /></>
              )}
              <strong>Roles:</strong> {formatRoles(profile.roles)}<br />
            </Card.Text>
            <Button variant="primary" onClick={handleEdit} style={{ backgroundColor: "#365486", borderColor: "#365486" }}>Edit</Button>
          </Card.Body>
        </Card>
      )}

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editableProfile && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" name="fullName" value={editableProfile.fullName} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Profile Picture URL</Form.Label>
                <Form.Control type="text" name="profilePicture" value={editableProfile.profilePicture} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={editableProfile.email} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" name="phoneNumber" value={editableProfile.phoneNumber} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Bio</Form.Label>
                <Form.Control as="textarea" name="bio" value={editableProfile.bio} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Control type="text" name="gender" value={editableProfile.gender} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Birth Date</Form.Label>
                <Form.Control type="date" name="birthDate" value={editableProfile.birthDate ? new Date(editableProfile.birthDate).toISOString().split('T')[0] : ''} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Old Password</Form.Label>
                <Form.Control type="password" name="oldPassword" value={editableProfile.oldPassword} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <Form.Control type="password" name="newPassword" value={editableProfile.newPassword} onChange={handleChange} />
              </Form.Group>
              {message && <Alert variant="danger">{message}</Alert>}
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleSave} style={{ backgroundColor: "#365486", borderColor: "#365486" }} disabled={editLoading}>
            {editLoading ? "Saving..." : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;