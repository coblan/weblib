export default {
     padding(num, length) {
        //这里用slice和substr均可
        return (Array(length).join("0") + num).slice(-length);
    }
}