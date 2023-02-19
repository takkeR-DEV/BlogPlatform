import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
} from '@chakra-ui/react';
import { FC, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { deleteArticle, fetchArticles } from '../../store/action-creator/articles';

const ModalDelete: FC<any> = ({ slug, token }) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const initRef: any = useRef();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const delArticle = (onClose: any): any => {
    onClose();
    dispatch(deleteArticle(slug, token)).then(() => dispatch(fetchArticles(1)).then(() => navigate('/articles')));
  };

  return (
    <Popover placement="right-start" initialFocusRef={initRef}>
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <Button colorScheme="red" variant="outline" w="78px" h="31px">
              Delete
            </Button>
          </PopoverTrigger>
          <PopoverContent w="240px" h="104px">
            <PopoverArrow />
            <PopoverBody>Are you sure to delete this article?</PopoverBody>
            <PopoverFooter border={'none'} display="flex" justifyContent={'flex-end'}>
              <Button colorScheme="gray" variant={'outline'} mr={3} onClick={onClose} w="34px" h="24px">
                No
              </Button>
              <Button colorScheme="blue" w="34px" h="24px" onClick={() => delArticle(onClose)}>
                Yes
              </Button>
            </PopoverFooter>{' '}
          </PopoverContent>
        </>
      )}
    </Popover>
  );
};

export default ModalDelete;
