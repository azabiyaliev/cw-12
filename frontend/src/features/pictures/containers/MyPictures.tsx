import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import {
  selectDeletePicture,
  selectPickedPictures,
  selectPictures,
  selectPicturesLoading,
} from "../picturesSlice.ts";
import React, { useEffect } from "react";
import {
  deletePictureById,
  getPickedPicture,
  getPictures,
} from "../picturesThunk.ts";
import { NavLink, useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import {
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import ModalWindow from "../../../components/ModalWindow/ModalWindow.tsx";
import { apiUrl } from "../../../globalConstants.ts";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import { selectUser } from "../../users/usersSlice.ts";

const MyPictures = () => {
  const user = useAppSelector(selectUser);
  const params = useParams<{ idUser: string }>();
  const dispatch = useAppDispatch();
  const pictures = useAppSelector(selectPictures);
  const loadingPictures = useAppSelector(selectPicturesLoading);
  const pickedPicture = useAppSelector(selectPickedPictures);
  const deletePictureLoading = useAppSelector(selectDeletePicture);
  const [open, setOpen] = React.useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const pictureView = async (id: string) => {
    openModal();
    await dispatch(getPickedPicture(id));
  };
  useEffect(() => {
    if (params.idUser) dispatch(getPictures(params.idUser));
  }, [dispatch, params.idUser]);

  const deletePicture = async (id: string) => {
    await dispatch(deletePictureById(id));
    if (params.idUser) await dispatch(getPictures(params.idUser));
  };

  return (
    <>
      <Container maxWidth="lg">
        <Box>
          {loadingPictures ? (
            <CircularProgress />
          ) : (
            <>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 2,
                    fontSize: 18,
                    textTransform: "uppercase",
                  }}
                >
                  <Typography variant="h6">
                    {pictures.length > 0 && pictures[0].user?.displayName
                      ? pictures[0].user?.displayName
                      : user && user.displayName}
                    `s Gallery
                  </Typography>
                  {user &&
                  (user.role === "admin" || user._id === params.idUser) ? (
                    <Typography
                      sx={{
                        color: "inherit",
                        textDecoration: "none",
                        textTransform: "uppercase",
                        fontSize: 18,
                        mr: 1,
                        "&:hover": { color: "#3d5afe" },
                      }}
                      component={NavLink}
                      to={"/addNewPicture"}
                    >
                      Add new photo
                    </Typography>
                  ) : null}
                </Box>
                {pictures.length === 0 && !loadingPictures ? (
                  <Typography variant="h6">No pictures yet</Typography>
                ) : (
                  <Grid container direction={"row"} spacing={3}>
                    {pictures.map((picture) => {
                      return (
                        <Grid key={picture._id} size={4}>
                          <Card
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              height: "93%",
                              maxWidth: 345,
                              mt: 5,
                              borderRadius: 2,
                              boxShadow: "0 4px 12px rgba(255, 255, 255, 0.2)",
                              "&:hover": { boxShadow: 10, color: "#3d5afe" },
                            }}
                          >
                            <Box>
                              <ModalWindow
                                onClose={closeModal}
                                open={open}
                                image={
                                  apiUrl +
                                  "/" +
                                  (pickedPicture ? pickedPicture.image : null)
                                }
                                title={pickedPicture ? pickedPicture.title : ""}
                              />
                              <CardMedia
                                style={{ width: "100%" }}
                                height={400}
                                component="img"
                                image={apiUrl + "/" + picture.image}
                                title={picture.title}
                                onClick={() => {
                                  void pictureView(picture._id);
                                }}
                              />
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  height: "50%",
                                }}
                              >
                                <CardContent
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}
                                >
                                  <Typography variant="h6" fontWeight="bold">
                                    {picture.title}
                                  </Typography>
                                  {user &&
                                  (user.role === "admin" ||
                                    user._id === picture.user._id) ? (
                                    <IconButton
                                      disabled={deletePictureLoading}
                                      onClick={() => deletePicture(picture._id)}
                                    >
                                      <DeleteIcon
                                        sx={{
                                          "&:hover": {
                                            boxShadow: 10,
                                            color: "red",
                                          },
                                        }}
                                      />
                                    </IconButton>
                                  ) : null}
                                </CardContent>
                              </Box>
                            </Box>
                          </Card>
                        </Grid>
                      );
                    })}
                  </Grid>
                )}
              </Box>
            </>
          )}
        </Box>
      </Container>
    </>
  );
};

export default MyPictures;
