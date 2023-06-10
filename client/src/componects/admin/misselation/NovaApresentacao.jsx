import {
  Modal,
  ModalOverlay,
  Button,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
  HStack,
  Box,
  Select,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { UserState } from "../../../context/UserProvider";
import ApresentacaoService from "../../../service/ApresentacaoService";
import CategoriaService from "../../../service/CategoriaService";
import UserService from "../../../service/UserService";
import UserBadgeItem from "./UserBadgeItem";
import UserListItem from "./UserListItem";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../connecntion/firebase";

const NovaApresentacao = ({ isOpen, onClose, fetcthAgain, setFecthAgain }) => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [supervisores, setSupervisores] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [tema, setTema] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [arquivo_path, setPdf] = useState();
  const Toast = useToast();
  const { user } = UserState();

  const fetchdata = async () => {
    const cat = await CategoriaService.getCategorias(user.token);
    const sup = await UserService.getUsers("ADMIN", user.token);

    setCategorias(cat);
    setSupervisores(sup);

    setCategoria(cat[0]._id);
    setSupervisor(sup[0]._id);
  };

  useEffect(() => {
    fetchdata();
  }, []);
  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      Toast({
        title: "Utilizador ja esta adicionado",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
    setSelectedIds([...selectedIds, userToAdd._id]);
    setSearchResult([]);
  };
  const handleChange = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    try {
      setLoading(true);
      const data = await UserService.getUsers(search, user.token);
      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      Toast({
        title: "Erro",
        description: "Falha no processo de procura de participantes",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!tema || !categoria || !supervisor || !arquivo_path) {
        Toast({
          title: "Erro",
          description: "Falha no processo de criacao apresentacao",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }

      const storageRef = ref(storage, `/files/${arquivo_path.name}`);
      const uploadTask = uploadBytesResumable(storageRef, arquivo_path);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setLoading(true);
          console.log(percent);
        },
        (err) => {
          throw new Error(err);
        },
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
            setPdf(url);
            const data = await ApresentacaoService.saveApresentacao(
              {
                tema: tema,
                categoria: categoria,
                supervisor: supervisor,
                arquivo_path: url,
                participantes: JSON.stringify(selectedIds),
              },
              user.token
            );
            Toast({
              title: `Apresentacao ${data.tema}, Submetida`,
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "top",
            });

            setLoading(false);
            onClose();
            setFecthAgain(!fetcthAgain);
          });
        }
      );
    } catch (error) {
      Toast({
        title: "Erro",
        description: error,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      onClose();
    }
  };
  const postDetails = (pdfFile) => {
    setLoading(true);
    if (pdfFile === undefined) {
      Toast({
        title: "Adicione uma imagem.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      return;
    }
    if (
      pdfFile.type === "application/pdf" ||
      pdfFile.type === "application/pdf"
    ) {
      setPdf(pdfFile);

      setLoading(false);
    } else {
      Toast({
        title: "Adicione um ficheiro pdf.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };
  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Formulario de submissão de Apresentacão</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing="15px">
            <FormControl width="100%">
              <FormLabel>Codigo dos participantes(s)</FormLabel>

              <Box
                border="1px"
                borderRadius="base"
                display="flex"
                borderColor="#C0F5FF"
              >
                {selectedUsers.map((u) => (
                  <UserBadgeItem
                    key={user._id}
                    user={u}
                    handleFunction={() => handleDelete(u)}
                  />
                ))}
                <Input
                  flex={1}
                  border="none"
                  type="text"
                  onChange={(e) => handleChange(e.target.value)}
                />
              </Box>
            </FormControl>
            <Box w="100%">
              {loading ? (
                <div>loading</div>
              ) : (
                searchResult
                  .slice(0, 3)
                  .map((user) => (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={() => handleGroup(user)}
                    />
                  ))
              )}
            </Box>
            <HStack w="100%" spacing="15px">
              <FormControl>
                <FormLabel>Tema</FormLabel>
                <Input
                  type="text"
                  borderColor="#C0F5FF"
                  value={tema}
                  onChange={(e) => setTema(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>supervisor</FormLabel>
                <Select
                  borderColor="#C0F5FF"
                  onChange={(e) => setSupervisor(e.target.value)}
                >
                  {supervisores.length > 0 &&
                    supervisores.map((sup) => (
                      <option key={sup._id} value={sup._id}>
                        {sup.name}
                      </option>
                    ))}
                </Select>
              </FormControl>
            </HStack>
            <HStack w="100%" spacing="15px">
              <FormControl>
                <FormLabel>Categoria</FormLabel>
                <Select
                  borderColor="#C0F5FF"
                  onChange={(e) => setCategoria(e.target.value)}
                >
                  {categorias.length > 0 &&
                    categorias.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.nome}
                      </option>
                    ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Arquivo</FormLabel>
                <Input
                  id="arquivo_path"
                  type="file"
                  borderColor="#C0F5FF"
                  accept="application/pdf"
                  onChange={(e) => postDetails(e.target.files[0])}
                />
              </FormControl>
            </HStack>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="linkedin"
            onClick={handleSubmit}
            isLoading={loading}
          >
            Submeter
          </Button>
          <Button colorScheme="blue" mx={3} onClick={onClose}>
            voltar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
NovaApresentacao.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  fetcthAgain: PropTypes.bool.isRequired,
  setFecthAgain: PropTypes.func.isRequired,
};
export default NovaApresentacao;
