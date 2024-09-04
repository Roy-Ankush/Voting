import user from '../models/user.js'
const checkAdminRole=async (userId)=>{
  try {
     const users=await user.findByID(userId);
     return users.role==='admin'
  } catch (error) {
    return false;
  }
}

export default checkAdminRole;