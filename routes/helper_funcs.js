const Todos = require("../schemas/TodoSchema");

const getUserTodoList = async (user_id) => {
  if (!user_id) return null;

  try {
    return await Todos.findOne({ user_id });
  } catch (err) {
    return null;
  }
};

// export default getUserTodoList;
