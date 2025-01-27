<template>
    <section class="container mx-auto">
        <Header :title="'Report a Problem'" />
        <form name="problem" method="POST" netlify-honeypot="winnie" netlify>
            <input type="hidden" name="form-name" value="problem">
            <fieldset class="winnie-field">
                <input type="text" name="winnie" id="winnie" value="">
                <label for="winnie">Screen Readers ignore this</label>
            </fieldset>
            <fieldset>
                <input type="text" name="name" id="name">
                <label for="name">Name</label>
            </fieldset>
            <fieldset>
                <input type="email" name="email" id="email" required>
                <label for="email">Email Address</label>
            </fieldset>
            <fieldset>
                <select name="subject" id="subject" required>
                    <option value="incorrect-data" selected>Incorrect data</option>
                    <option value="add-something">I'd like to add something</option>
                    <option value="other">Other</option>
                </select>
                <label for="subject">Subject</label>
            </fieldset>
            <fieldset>
                <textarea rows="4" required name="message" id="message"></textarea>
                <label for="message">Message</label>
            </fieldset>
            <button type="submit" class="btn-primary">Submit message</button>
        </form>
    </section>
</template>

<style>
    .winnie-field {
        @apply relative;
        left: -200%;
        max-height: 1px;
    }
</style>

<script>
    export default {
        data: () => ({

        }),
        mounted() {

        }
    }
</script>
