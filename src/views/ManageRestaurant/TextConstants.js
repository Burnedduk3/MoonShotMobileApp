export const getRestaurant = `
query($username:String!){
  Business{
    getMyRestaurant(data:{username:$username}){
      error
      message
      data{
        id
        restaurantIdentifier
        name
        address
        phoneNumber
        maxCapacity
        capacity
      }
    }
  }
}
`;

export const updateRestaurantCapacity = `
mutation($action: String!, $restaurantId: String!) {
  business {
    updateCapacity(
      action: $action
      data: { restaurantId: $restaurantId}
    ) {
      error
      message
      data {
        capacity
      }
    }
  }
}
`;

export const ViewText = {
  emptyPlaces: {
    title: 'Quedan',
    postfix: ' Puestos',
  },
  capacity: {
    title: 'Capacidad',
  },
};
