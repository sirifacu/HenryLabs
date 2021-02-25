import { makeStyles } from '@material-ui/core';

export const useStylesCohortForm = makeStyles(theme => ({
    productForm: {
        margin: 'auto',
        width: '40%',
    },
    formSwitch: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '10px 0 5px 0',
        margin: '0'
    },
    imageUpload: {
        display: 'flex',
        margin: '10px 0 15px 0',
        justifyContent: 'center',
        border: '1px dashed gray',
    },
    labelImage: {
        marginRight: '10px',
    },
    previewImageDiv: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    previewImage: {
        maxWidth: '200px',
        maxHeight: '130px',
    },
    submitButton: {
      marginTop: '6%',
    },
    isLoading: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '20% auto',
    }
}));

export const useStylesProductCard = makeStyles(theme => ({
      lineThrough: {
        textDecoration: 'line-through',
        fontSize: '.9rem',
        color: 'gray'
      },
      root: {
        width: "100%",
        Height:'400px',
        position: "relative"
      },
      hasStock: {
        display: 'none'
      },
      outOfStock: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.secondary.main,
        opacity: 0.4,
        display: 'block',
        zIndex: 10000,
     },
      media: {
        minHeight : "10em"
      },
      noLinkStyle: {
        textDecoration: 'none',
      },
      info: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      rightText: {
        
      }
      }));

export const useStylesProduct = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  image: {
    maxWidth: '70%'
  },
  categories: {
    fontSize: '1rem',
    display: 'flex',
    padding: '0 0 0 0'
  },
  category: {
    fontSize: '.9rem',
    padding: '1% 4%',
    borderRadius: '11%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    boxShadow: '1px 5px 10px rgb(0 0 0 / 50%)',
    margin: '2% 3% 7% 3%',
  },
  detailContainer: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: '6%',
    width: '35rem',
  },
  price: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10% 0 0 0'
  },
  actualPrice: {
    fontSize: 'xx-large',
  },
  lineThrough: {
    textDecoration: 'line-through',
    fontSize: '.8rem',
    color: 'gray'
  },
  stock: {
    margin: '0% 3%',
    fontSize: '.8rem',
  },
  description: {
    margin: '5% 0',
    whiteSpace: 'pre-line',
  },
  textCart: {
    paddingLeft: '8px',
  },
  isLoading: {
    display: 'flex',
    justifySelf: 'center',
    alignItems: 'center',
    margin: '20% auto',
  },
  rating: {
    display: 'flex',
    flexDirection: 'column',
    padding: '4% 0 0 0',

  },
  ratingReviews: {
    marginLeft: '4%',
    color: 'gray'
  },
  imagesContainer: {
    width: '200%',
    border: '1px solid gray',
  },
  reviewContainer: {
    paddingLeft: '0',

  },
  descriptionContainer: {
    paddingLeft: '0',
    margin: '6% 0',
    color: 'gray',
  },
  ratingContainer: {
    padding: '2% 0 1% 0',
    display: 'flex',
    alignItems: 'center',
  },
  reviewTotal: {
    fontSize: '.8rem',
    marginLeft: '3%',
    cursor: 'pointer',
  },
  verMas: {
    cursor: 'pointer',
  },
  quantityContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '0',

  },
  quantity: {
    width: '50px',
  },
  addToCart: {
    marginTop: '10%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
  },
  descriptionTitle: {
    color: theme.palette.primary.main,
    marginBottom: '2%',
  },
  addRating: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '10%',
  },
  reviews: {
    display: 'flex',
  },
  ratingButton: {
    marginTop: '5%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
  },
  addRatingTitle: {
    marginBottom: '11%',
  },
  goToSetReview: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    margin: '0 5%',
  },
  noStock: {
    fontSize: '1.5rem',
    border: '1px solid #ddd',
  }
}));

export const useStylesImageGalery = makeStyles(theme => ({
  imageContainer: {
    display: 'flex',
  },
  thumbContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '10rem',
    height: 'fit-content',
    border: '1px solid #ddd',
  },
  img: {
    width: '4rem',
  },
  image: {
    width: '7rem',
    cursor: 'pointer',
    opacity: '.7',
    '&:active': {
      border: '2px solid red',
    }
  },
  bigImage: {
    width: '38rem',
    display: 'flex',
    justifyContent: 'center',
    border: '1px solid gray',
    marginLeft: '1%',
    overflow: 'hidden',
  },
  principalImage: {
    maxWidth: '100%',
    maxHeight: '100%',
    '&:hover': {
      transform: 'scale(1.25)',
    }
  },
  largeImage: {
    zIndex: '1000',
  }
}));
