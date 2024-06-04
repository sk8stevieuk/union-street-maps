<template>
    <section class="container mx-auto">
        <h1>Report a Problem</h1>
        <p></p>
        <form name="problem" method="POST" netlify-honeypot="winnie" netlify>
            <input type="hidden" name="form-name" value="problem">
            <fieldset class="winnie-field">
                <input type="text" name="winnue" id="winnie">
                <label for="name">Screen Readers ignore this</label>
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
    form {
        @apply flex flex-col items-baseline w-full gap-4;

        > button {
            @apply bg-black text-white rounded-full px-4 py-2;
        }
    }

    [type='submit'] {
        @apply bg-black;
    }

    .winnie-field {
        @apply relative;
        left: -200%;
        max-height: 1px;
    }

    fieldset {
        @apply flex flex-col w-full;

        > label {
            order: 1;
            @apply font-bold;
        }

        > input, textarea, select {
          order: 2;
          @apply border rounded p-2 mt-1 w-full;
        }
    }

    input:not(:required) + label:after, textarea:not(:required) + label:after, select:not(:required) + label:after {
        content: "(Optional)";
        @apply float-right opacity-50 italic;
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
