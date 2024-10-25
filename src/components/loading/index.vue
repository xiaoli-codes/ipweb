<template>
    <div v-if="loading" class="overlay">
        <a-spin tip="Loading..." size="large"></a-spin>
    </div>
</template>

<script>

export default {
    props: {
        loading: {
            type: Boolean,
            Required: true
        }
    }
}

</script>